import { ConnectToRoom } from '../../video-chat/connectToRoom';

export class ConnectToRoomRequest {

    connectToRoom: ConnectToRoom;

    constructor(connectToRoom: ConnectToRoom) {
        this.connectToRoom = connectToRoom;
    }
}