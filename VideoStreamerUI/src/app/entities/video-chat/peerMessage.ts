export class PeerMessage {
    By: string;
    To: string;
    RoomId: string;
    Type: string;
    Ice: RTCIceCandidate;
    Sdp: RTCSessionDescriptionInit;

    constructor(by: string, to: string, roomId: string, type: string, ice: RTCIceCandidate, sdp: RTCSessionDescriptionInit) {
        this.By = by;
        this.To = to;
        this.RoomId = roomId;
        this.Type = type;
        this.Ice = ice;
        this.Sdp = sdp;
    }
}