import { SocialUser } from 'angularx-social-login';

export class ChatMessage {
    Id: string;
    RoomId: string;
    User: SocialUser;

    Message: string;
    VoiceMessage: string;
    DateTime: Date;
    MovieCurrentTime: number; // seconds into the movie
}
