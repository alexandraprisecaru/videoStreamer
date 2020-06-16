import { SocialUser } from 'angularx-social-login';
import { VideoInfo } from '../videoInfo';

export class PeerMessage {
    By: string;
    To: string;
    RoomId: string;
    Type: string;
    Ice: RTCIceCandidate;
    Sdp: RTCSessionDescriptionInit;
    User: SocialUser;
    VideoInfo: VideoInfo;

    constructor(by: string, to: string, roomId: string, type: string, user: SocialUser, videoInfo: VideoInfo, ice: RTCIceCandidate, sdp: RTCSessionDescriptionInit) {
        this.By = by;
        this.To = to;
        this.RoomId = roomId;
        this.Type = type;
        this.User = user;
        this.VideoInfo = videoInfo;
        this.Ice = ice;
        this.Sdp = sdp;
    }
}