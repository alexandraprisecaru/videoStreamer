import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { WebRTCClientStore } from './webrtc-client.store.service';
import { WebRTCClient } from './webrtc-client.model';
import { SocketIOClient } from 'socket.io-client/lib';
import {
  SOCKET_EVENT_PEER_CONNECTED,
  SOCKET_EVENT_PEER_DISCONNECTED,
  SOCKET_EVENT_PEER_MESSAGE,
  SOCKET_EVENT_CONNECT_TO_ROOM,
  RTC_PEER_MESSAGE_ICE,
  RTC_PEER_MESSAGE_SDP_ANSWER,
  RTC_PEER_MESSAGE_SDP_OFFER
} from './webrtc-event-messages';
import { MediaStreamService } from '../../shared/mediastream.service';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { VideoInfo } from 'src/app/entities/videoInfo';
import { RTCPeerConnectionRoom } from 'src/app/entities/rtcPeerConnectionRoom';

// TODO
// Configure ICE Server

@Injectable()
export class WebRTCConnectionService {
  private socket: SocketIOClient;
  private peerConnections: RTCPeerConnectionRoom[] = [];
  private myMediaStream: MediaStream = undefined;
  private peerId: string;

  constructor(
    private webrtcClientStore: WebRTCClientStore,
    private mediaStream: MediaStreamService,
    private webSocketService: WebSocketsService
  ) {
    this.socket = io.connect('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Socket connected. I am', this.socket.id);
      this.peerId = this.socket.id;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected. I was', this.socket.id);
    });

    this.socket.on(SOCKET_EVENT_PEER_CONNECTED, (data) => {
      this.makeOffer(data.id, data.videoInfo.roomId);
    });

    this.socket.on(SOCKET_EVENT_PEER_DISCONNECTED, (data) => {
      // todo
    });

    this.socket.on(SOCKET_EVENT_PEER_MESSAGE, (data) => {
      this.handleRTCPeerMessage(data);
    });
  }

  public connectVideoAndAudio(videoInfo: VideoInfo) {
    this.mediaStream
      .getMediaStream()
      .then((stream: MediaStream) => {
        this.myMediaStream = stream;

        // add myself to the list
        const me = new WebRTCClient({ id: this.socket.id, roomId: videoInfo.roomId, stream: this.myMediaStream });

        let wasAdded = this.webrtcClientStore.tryAddClient(me);
        if (wasAdded) {
          this.webSocketService.sendConnectVideoRequest(videoInfo);
          this.webSocketService.sendConnectAudioRequest(videoInfo);
  
          this.socket.emit(SOCKET_EVENT_CONNECT_TO_ROOM, {
            by: this.peerId,
            videoInfo: videoInfo
          });
          
          this.addStream();
        }
      })
      .catch(err => console.error('Can\'t get media stream', err));
  }

  private makeOffer(socketId: string, roomId: string) {
    if (socketId === this.peerId) {
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
              this.socket.emit(SOCKET_EVENT_PEER_MESSAGE, {
                by: this.peerId,
                to: socketId,
                roomId: roomId,
                sdp: sdp,
                type: RTC_PEER_MESSAGE_SDP_OFFER
              })
            })
        })
    })
  }

  private handleRTCPeerMessage(message) {
    if (message.by === this.peerId) {
      return;
    }

    const peerConnections = this.getPeerConnections(message.by, message.roomId);
    if (!peerConnections || peerConnections.length === 0) {
      return;
    }

    peerConnections.forEach(peerConnection => {
      switch (message.type) {
        case RTC_PEER_MESSAGE_SDP_OFFER:
          peerConnection
            .setRemoteDescription(new RTCSessionDescription(message.sdp))
            .then(() => {
              console.log('Setting remote description by offer');
              return peerConnection
                .createAnswer()
                .then((sdp: RTCSessionDescriptionInit) => {
                  return peerConnection.setLocalDescription(sdp)
                    .then(() => {
                      this.socket.emit(SOCKET_EVENT_PEER_MESSAGE, {
                        by: this.peerId,
                        to: message.by,
                        roomId: message.roomId,
                        sdp: sdp,
                        type: RTC_PEER_MESSAGE_SDP_ANSWER
                      });
                    })
                });
            })
            .catch(err => {
              console.error('Error on SDP-Offer:', err);
            });
          break;
        case RTC_PEER_MESSAGE_SDP_ANSWER:
          peerConnection
            .setRemoteDescription(new RTCSessionDescription(message.sdp))
            .then(() => console.log('Setting remote description by answer'))
            .catch(err => console.error('Error on SDP-Answer:', err));
          break;
        case RTC_PEER_MESSAGE_ICE:
          if (message.ice) {
            console.log('Adding ice candidate');
            peerConnection.addIceCandidate(message.ice);
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
      this.socket.emit(SOCKET_EVENT_PEER_MESSAGE, {
        by: this.peerId,
        to: socketId,
        ice: event.candidate,
        roomId: roomId,
        type: RTC_PEER_MESSAGE_ICE
      })
    };

    // peerConnection.onnegotiationneeded = () => {
    //   console.log('Need negotiation:', socketId);
    // }

    peerConnection.onnegotiationneeded = async e => {
      try {
        // await peerConnection.setLocalDescription(await peerConnection.createOffer());
        // await pc2.setRemoteDescription(peerConnection.localDescription);
        // await pc2.setLocalDescription(await pc2.createAnswer());
        // await pc1.setRemoteDescription(pc2.localDescription);
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
      // DEPECRATED https://developer.mozilla.org/de/docs/Web/API/RTCPeerConnection/addStream

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
}