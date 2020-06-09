export class ChatMessagesRequest {

  public roomId: string;
  public userId: string;

  constructor(roomId: string, userId: string) {
    this.roomId = roomId;
    this.userId = userId;
  }
}
