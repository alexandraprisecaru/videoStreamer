import { VideoInfo } from '../videoInfo';

export class ConnectToRoom {
    SocketId: string;
    VideoInfo: VideoInfo

    constructor(socketId: string, videoInfo: VideoInfo) {
        this.SocketId = socketId;
        this.VideoInfo = videoInfo;
    }
}