import { VideoInfo } from '../videoInfo';

export class VideoInfoUpdates {
    
    roomId: string;
    videoInfoUsers: VideoInfo[];

    constructor(roomId: string, videoInfoUsers: VideoInfo[]) {
        this.roomId = roomId;
        this.videoInfoUsers = videoInfoUsers;
    }
}