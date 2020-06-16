import { SocialUser } from 'angularx-social-login';

export class StoppedVideoNotification {

    constructor(public User: SocialUser, public RoomId: string, public SocketId: string) {
    }
}