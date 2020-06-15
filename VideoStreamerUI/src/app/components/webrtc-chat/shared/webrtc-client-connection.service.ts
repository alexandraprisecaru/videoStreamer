import { Injectable } from '@angular/core';

import { WebRTCClientStore } from './webrtc-client.store.service';
import { WebRTCClient } from './webrtc-client.model';
import {
  RTC_PEER_MESSAGE_ICE,
  RTC_PEER_MESSAGE_SDP_ANSWER,
  RTC_PEER_MESSAGE_SDP_OFFER
} from './webrtc-event-messages';
import { MediaStreamService } from '../../shared/mediastream.service';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { VideoInfo } from 'src/app/entities/videoInfo';
import { RTCPeerConnectionRoom } from 'src/app/entities/rtcPeerConnectionRoom';
import { Observer } from 'rxjs';
import { SocketStatusUpdate } from 'src/app/entities/responses/SocketStatusUpdate';
import { ConnectToRoom } from 'src/app/entities/video-chat/connectToRoom';
import { PeerMessage } from 'src/app/entities/video-chat/peerMessage';

// TODO
// Configure ICE Server
@Injectable()
export class WebRTCConnectionService {
  private peerConnections: RTCPeerConnectionRoom[] = [];
  private myMediaStream: MediaStream = undefined;

  constructor(
    private webrtcClientStore: WebRTCClientStore,
    private mediaStream: MediaStreamService,
    private webSocketService: WebSocketsService
  ) {

    this.createUserDisconnectedSubscription();

    this.createPeerConnectedSubscription();
    this.createPeerDisconnectedSubscription();
    this.createPeerMessageSubscription();
  }

  public connectVideoAndAudio(videoInfo: VideoInfo) {
    this.mediaStream
      .getMediaStream()
      .then((stream: MediaStream) => {
        this.myMediaStream = stream;

        // add myself to the list
        const me = new WebRTCClient({ id: this.webSocketService.socketId, roomId: videoInfo.RoomId, stream: this.myMediaStream });

        let wasAdded = this.webrtcClientStore.tryAddClient(me);
        if (wasAdded) {
          this.webSocketService.sendConnectToRoomVideoRequest(new ConnectToRoom(this.webSocketService.socketId, videoInfo));
          this.addStream();
        }
      })
      .catch(err => console.error('Can\'t get media stream', err));
  }

  private makeOffer(socketId: string, roomId: string) {
    if (socketId === this.webSocketService.socketId) {
      return;
    }

    const peerConnections = this.getPeerConnections(socketId, roomId);
    if (!peerConnections || peerConnections.length === 0) {
      return;
    }

    peerConnections.forEach(peerConnection => {
      const options = {
        iceRestart: false,
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
        voiceActivityDetection: true
      };

      peerConnection
        .createOffer(options)
        .then((sdp: RTCSessionDescriptionInit) => {
          return peerConnection
            .setLocalDescription(sdp)
            .then(() => {
              this.webSocketService.sendPeerMessageRequest(
                new PeerMessage(
                  this.webSocketService.socketId,
                  socketId,
                  roomId,
                  RTC_PEER_MESSAGE_SDP_OFFER,
                  null,
                  sdp
                )
              );
            })
        })
    })
  }

  private handleRTCPeerMessage(message: PeerMessage) {
    if (message.By === this.webSocketService.socketId) {
      return;
    }

    const peerConnections = this.getPeerConnections(message.By, message.RoomId);
    if (!peerConnections || peerConnections.length === 0) {
      return;
    }

    peerConnections.forEach(peerConnection => {
      switch (message.Type) {
        case RTC_PEER_MESSAGE_SDP_OFFER:
          peerConnection
            .setRemoteDescription(new RTCSessionDescription(message.Sdp))
            .then(() => {
              console.log('Setting remote description by offer');
              return peerConnection
                .createAnswer()
                .then((sdp: RTCSessionDescriptionInit) => {
                  return peerConnection.setLocalDescription(sdp)
                    .then(() => {
                      this.webSocketService.sendPeerMessageRequest(new PeerMessage(
                        this.webSocketService.socketId,
                        message.By,
                        message.RoomId,
                        RTC_PEER_MESSAGE_SDP_ANSWER,
                        null,
                        sdp
                      ));
                    })
                });
            })
            .catch(err => {
              console.error('Error on SDP-Offer:', err);
            });
          break;
        case RTC_PEER_MESSAGE_SDP_ANSWER:
          peerConnection
            .setRemoteDescription(new RTCSessionDescription(message.Sdp))
            .then(() => console.log('Setting remote description by answer'))
            .catch(err => console.error('Error on SDP-Answer:', err));
          break;
        case RTC_PEER_MESSAGE_ICE:
          if (message.Ice) {
            console.log('Adding ice candidate');
            peerConnection.addIceCandidate(message.Ice);
          }
          break;
      }
    })
  }

  private getPeerConnection(socketId: string, roomId: string): RTCPeerConnectionRoom {
    let connection = this.peerConnections.find(x => x.socketId === socketId && x.roomId === roomId);
    if (connection) {
      return connection;
    }

    const peerConnection = new RTCPeerConnectionRoom(roomId, socketId);

    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      this.webSocketService.sendPeerMessageRequest(new PeerMessage(
        this.webSocketService.socketId,
        socketId,
        roomId,
        RTC_PEER_MESSAGE_ICE,
        event.candidate,
        null
      ));
    };

    peerConnection.onnegotiationneeded = async e => {
      try {
        console.log('Need negotiation:', socketId);
      } catch (e) {
        console.log(e);
      }
    }

    peerConnection.onsignalingstatechange = () => {
      console.log('ICE signaling state changed to:', peerConnection.signalingState, 'for client', socketId);
    }

    // Workaround for Chrome 
    // see: https://github.com/webrtc/adapter/issues/361
    if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > - 1) { // Chrome
      if (this.myMediaStream) {
        (peerConnection as any).addStream(this.myMediaStream);
      }

      (peerConnection as any).onaddstream = (event) => {
        console.log('Received new stream');
        const client = new WebRTCClient({ id: socketId, roomId: roomId, stream: event.stream });
        this.webrtcClientStore.tryAddClient(client);
      };
    } else {  // Firefox
      peerConnection.addTrack(this.myMediaStream.getVideoTracks()[0], this.myMediaStream);
      peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log('Received new stream');
        const client = new WebRTCClient({ id: socketId, roomId: roomId, stream: event.streams[0] });
        this.webrtcClientStore.tryAddClient(client);
      }
    }

    return peerConnection;
  }

  private getPeerConnections(socketId: string, roomId: string): RTCPeerConnectionRoom[] {
    let roomConnections = this.peerConnections.filter(x => x.roomId === roomId && x.socketId !== undefined && x.socketId === socketId);
    if (!roomConnections || roomConnections.length === 0) {
      let connection1 = this.getPeerConnection(socketId, roomId);
      this.peerConnections.push(connection1);
    }

    return this.peerConnections.filter(x => x.roomId === roomId);
  }

  private addStream() {
    this.peerConnections.forEach(connection => {
      (connection as any).addStream(this.myMediaStream);
    });
  }

  private userDisconnected(socketStatus: SocketStatusUpdate) {
    this.webrtcClientStore.removeClient(socketStatus.SocketId);
    this.peerConnections = this.peerConnections.filter(x => x.socketId !== socketStatus.SocketId);
    
    this.myMediaStream.getVideoTracks()[0].stop();
    this.myMediaStream.getAudioTracks()[0].stop();
  }

  private createUserDisconnectedSubscription() {
    let self = this;
    const socketStatusUpdatesObserver: Observer<SocketStatusUpdate> = {
      next: function (status: SocketStatusUpdate): void {
        self.userDisconnected(status);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more socket status updates');
      }
    };

    this.webSocketService.subscribeToUserDisconnected(socketStatusUpdatesObserver);
  }

  private createPeerConnectedSubscription() {
    let self = this;
    const peerConnectedObserver: Observer<ConnectToRoom> = {
      next: function (connectToRoom: ConnectToRoom): void {
        self.makeOffer(connectToRoom.SocketId, connectToRoom.VideoInfo.RoomId);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more connect to room updates');
      }
    };

    this.webSocketService.subscribeToPeerConnected(peerConnectedObserver);
  }

  private createPeerDisconnectedSubscription() {
    let self = this;
    const peerDisconnectedObserver: Observer<ConnectToRoom> = {
      next: function (connectToRoom: ConnectToRoom): void {
        // self.makeOffer(connectToRoom.socketId, connectToRoom.videoInfo.roomId);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more disconnect from room updates');
      }
    };

    this.webSocketService.subscribeToPeerDisconnected(peerDisconnectedObserver);
  }

  private createPeerMessageSubscription() {
    let self = this;
    const peerMessageObserver: Observer<PeerMessage> = {
      next: function (message: PeerMessage): void {
        self.handleRTCPeerMessage(message);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more peer message updates');
      }
    };

    this.webSocketService.subscribeToPeerMessage(peerMessageObserver);
  }
}
