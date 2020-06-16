import { VideoInfo } from '../videoInfo';
import { SocialUser } from 'angularx-social-login';

export class ConnectToRoom {
    SocketId: string;
    VideoInfo: VideoInfo
    User: SocialUser;

    constructor(socketId: string, videoInfo: VideoInfo, user: SocialUser) {
        this.SocketId = socketId;
        this.VideoInfo = videoInfo;
        this.User = user;
    }
}