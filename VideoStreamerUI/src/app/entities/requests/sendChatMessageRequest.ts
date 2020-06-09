import { ChatMessage } from '../chatMessage';

export class SendChatMessageRequest {

  public roomId: string;
  public userId: string;
  public chatMessage: ChatMessage;

  constructor(roomId: string, userId: string, chatMessage: ChatMessage) {
    this.roomId = roomId;
    this.userId = userId;
    this.chatMessage = chatMessage;
  }
}
