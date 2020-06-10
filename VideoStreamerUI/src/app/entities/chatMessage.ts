import { SocialUser } from 'angularx-social-login';

export class ChatMessage {
    Id: string;
    RoomId: string;
    User: SocialUser;

    Message: string;
    VoiceMessage: string;
    DateTime: Date;
    MovieCurrentTime: number; // seconds into the movie

    constructor(roomId: string, user: SocialUser, message: string, voiceMessage: string, datetime: Date, movieCurrentTime: number) {
        this.RoomId = roomId;
        this.User = user;
        this.Message = message;
        this.VoiceMessage = voiceMessage;
        this.DateTime = datetime;
        this.MovieCurrentTime = movieCurrentTime;
    }
}
