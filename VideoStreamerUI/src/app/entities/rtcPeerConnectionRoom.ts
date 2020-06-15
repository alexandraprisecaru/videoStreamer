export class RTCPeerConnectionRoom extends RTCPeerConnection {
    roomId: string;
    socketId: string;

    constructor(roomId: string, socketId: string) {
        super();
        this.roomId = roomId;
        this.socketId = socketId;
    }
}