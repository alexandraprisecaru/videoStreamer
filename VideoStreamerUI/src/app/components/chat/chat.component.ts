import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ChatMessage } from 'src/app/entities/chatMessage';
import { SocialUser } from 'angularx-social-login';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @ViewChild('msgForm') formValues; // Added this

  @Input() roomId: string;
  @Input() user: SocialUser;

  chatMessages: ChatMessage[] = [];

  constructor(private webSocketService: WebSocketsService) {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.roomId || !this.user) {
      return;
    }

    this.webSocketService.sendChatMessagesRequest(this.roomId);
  }

  ngOnInit(): void {
    this.createChatMessagesReponsesSubscription();
    this.createChatMessageUpdatesSubscription();
  }

  sendMessage(value: string) {
    if (!value || value === "") {
      return;
    }
    let chatMessage: ChatMessage = new ChatMessage(
      this.roomId,
      this.user,
      value,
      "voice msg cica",
      new Date(),
      1 //this.video.getVideoTag().currentTime
    );

    this.chatMessages.push(chatMessage);
    this.formValues.nativeElement.reset();
    this.webSocketService.sendChatMessageRequest(this.roomId, chatMessage);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  private setChatMessages(roomId: string, chatMessages: ChatMessage[]) {
    if (roomId !== this.roomId) {
      return;
    }

    if (!chatMessages) {
      return;
    }

    this.chatMessages = chatMessages;
  }

  private addChatMessage(chatMessage: ChatMessage) {
    if (!chatMessage) {
      return;
    }

    if (chatMessage.RoomId !== this.roomId) {
      return;
    }

    this.chatMessages.push(chatMessage);
  }

  private createChatMessagesReponsesSubscription() {
    let self = this;
    const chatMessagesResponseObserver: Observer<ChatMessage[]> = {
      next: function (messages: ChatMessage[]): void {
        if (!messages || messages.length === 0) {
          return;
        }

        self.setChatMessages(messages[0].RoomId, messages);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more chat messages responses');
      }
    };

    this.webSocketService.subscribeToChatMessagesReponses(chatMessagesResponseObserver);
  }

  private createChatMessageUpdatesSubscription() {
    let self = this;
    const chatMessagesUpdateObserver: Observer<ChatMessage> = {
      next: function (message: ChatMessage): void {
        if (!message) {
          return;
        }

        self.addChatMessage(message);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No more chat message updates');
      }
    };

    this.webSocketService.subscribeToChatMessageUpdates(chatMessagesUpdateObserver);
  }

}
