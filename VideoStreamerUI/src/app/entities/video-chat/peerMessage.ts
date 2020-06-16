import { SocialUser } from 'angularx-social-login';

export class PeerMessage {
    By: string;
    To: string;
    RoomId: string;
    Type: string;
    Ice: RTCIceCandidate;
    Sdp: RTCSessionDescriptionInit;
    User: SocialUser;

    constructor(by: string, to: string, roomId: string, type: string, user: SocialUser, ice: RTCIceCandidate, sdp: RTCSessionDescriptionInit) {
        this.By = by;
        this.To = to;
        this.RoomId = roomId;
        this.Type = type;
        this.User = user;
        this.Ice = ice;
        this.Sdp = sdp;
    }
}