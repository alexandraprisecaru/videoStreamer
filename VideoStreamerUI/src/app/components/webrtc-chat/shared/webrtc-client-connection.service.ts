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

// TODO
// Configure ICE Server

@Injectable()
export class WebRTCConnectionService {
  private socket: SocketIOClient;
  private peerConnections: RTCPeerConnection[] = [];
  private myMediaStream: MediaStream = undefined;
  private peerId: string;

  constructor(
    private webrtcClientStore: WebRTCClientStore,
    private mediaStream: MediaStreamService
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
      this.makeOffer(data.id);
    });

    this.socket.on(SOCKET_EVENT_PEER_DISCONNECTED, (data) => {
      // todo
    });

    this.socket.on(SOCKET_EVENT_PEER_MESSAGE, (data) => {
      this.handleRTCPeerMessage(data);
    });
  }

  public connectToRoom(roomId: string) {
    this.mediaStream
      .getMediaStream()
      .then((stream: MediaStream) => {
        this.myMediaStream = stream;
        this.socket.emit(SOCKET_EVENT_CONNECT_TO_ROOM);

        // add myself to the list
        const me = new WebRTCClient({ id: this.socket.id, roomId: roomId, stream: this.myMediaStream });
        this.webrtcClientStore.addClient(me);
      })
      .catch(err => console.error('Can\'t get media stream', err));
  }

  private makeOffer(roomId: string) {
    const peerConnections = this.getPeerConnections(roomId);
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
                to: roomId,
                sdp: sdp,
                type: RTC_PEER_MESSAGE_SDP_OFFER
              })
            })
        })
    })
  }

  private handleRTCPeerMessage(message) {
    const peerConnections = this.getPeerConnections(message.roomId);
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

  private getPeerConnection(id: string, roomId: string): RTCPeerConnection {
    if (this.peerConnections[id]) {
      return this.peerConnections[id];
    }

    const peerConnection = new RTCPeerConnection();
    this.peerConnections[id] = peerConnection;

    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      this.socket.emit(SOCKET_EVENT_PEER_MESSAGE, {
        by: this.peerId,
        to: id,
        ice: event.candidate,
        type: RTC_PEER_MESSAGE_ICE
      })
    };

    peerConnection.onnegotiationneeded = () => {
      console.log('Need negotiation:', id);
    }

    peerConnection.onsignalingstatechange = () => {
      console.log('ICE signaling state changed to:', peerConnection.signalingState, 'for client', id);
    }

    // Workaround for Chrome 
    // see: https://github.com/webrtc/adapter/issues/361
    if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > - 1) { // Chrome
      // DEPECRATED https://developer.mozilla.org/de/docs/Web/API/RTCPeerConnection/addStream
      (peerConnection as any).addStream(this.myMediaStream);
      (peerConnection as any).onaddstream = (event) => {
        console.log('Received new stream');
        const client = new WebRTCClient({ id: id, roomId: roomId, stream: event.stream });
        this.webrtcClientStore.addClient(client);
      };
    } else {  // Firefox
      peerConnection.addTrack(this.myMediaStream.getVideoTracks()[0], this.myMediaStream);
      peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log('Received new stream');
        const client = new WebRTCClient({ id: id, roomId: roomId, stream: event.streams[0] });
        this.webrtcClientStore.addClient(client);
      }
    }

    return peerConnection;
  }

  private getPeerConnections(roomId: string): RTCPeerConnection[] {
    if (this.peerConnections[roomId]) {
      return this.peerConnections[roomId];
    }

    let connections: RTCPeerConnection[] = [];
    this.peerConnections[roomId].array.forEach(element => {
      let conn = this.getPeerConnection[element.id];
      connections.push(conn);
    });

    return connections;
  }
}