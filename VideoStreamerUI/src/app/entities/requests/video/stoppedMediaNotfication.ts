import { SocialUser } from 'angularx-social-login';

export class StoppedMediaNotification {

    constructor(public User: SocialUser, public RoomId: string, public SocketId: string) {
    }
}