import { SocialUser } from 'angularx-social-login';
import { VideoInfo } from './videoInfo';

export class RTCPeerConnectionRoom extends RTCPeerConnection {
    roomId: string;
    socketId: string;
    user: SocialUser;
    videoInfo: VideoInfo

    constructor(roomId: string, socketId: string, user: SocialUser, videoInfo: VideoInfo) {
        super();
        this.roomId = roomId;
        this.socketId = socketId;
        this.user = user;
        this.videoInfo = videoInfo;
    }
}