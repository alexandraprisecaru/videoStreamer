export class ChatMessage {
    Id: string;
    RoomId: string;
    UserId: string;

    Message: string;
    VoiceMessage: string;
    DateTime: Date;
    MovieCurrentTime: number; // seconds into the movie
}
