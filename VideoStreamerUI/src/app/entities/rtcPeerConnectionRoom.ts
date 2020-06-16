import { SocialUser } from 'angularx-social-login';

export class RTCPeerConnectionRoom extends RTCPeerConnection {
    roomId: string;
    socketId: string;
    user: SocialUser;

    constructor(roomId: string, socketId: string, user: SocialUser) {
        super();
        this.roomId = roomId;
        this.socketId = socketId;
        this.user  = user;
    }
}