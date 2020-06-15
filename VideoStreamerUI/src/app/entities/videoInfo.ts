export class VideoInfo {

    userId: string;
    roomId: string;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;

    constructor(userId:string, roomId:string, isAudioEnabled: boolean, isVideoEnabled: boolean) {
        this.userId=userId;
        this.roomId=roomId;
        this.isAudioEnabled = isAudioEnabled;
        this.isVideoEnabled = isVideoEnabled;
    }
}