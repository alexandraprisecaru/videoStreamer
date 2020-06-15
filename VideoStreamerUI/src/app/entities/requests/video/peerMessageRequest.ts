import { PeerMessage } from '../../video-chat/peerMessage';

export class PeerMessageRequest {

    peerMessage: PeerMessage;

    constructor(peerMessage: PeerMessage) {
        this.peerMessage = peerMessage;
    }
}