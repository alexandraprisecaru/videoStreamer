export class VideoInfo {

    UserId: string;
    RoomId: string;
    IsAudioEnabled: boolean;
    IsVideoEnabled: boolean;

    constructor(userId: string, roomId: string, isAudioEnabled: boolean, isVideoEnabled: boolean) {
        this.UserId = userId;
        this.RoomId = roomId;
        this.IsAudioEnabled = isAudioEnabled;
        this.IsVideoEnabled = isVideoEnabled;
    }
}