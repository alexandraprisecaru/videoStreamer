import { Component, OnInit, ElementRef, QueryList, ViewChildren, Input, ViewChild } from '@angular/core';
import { Observer } from 'rxjs';
import { ChatMessage } from 'src/app/entities/chatMessage';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild('msgForm') formValues;
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ChatMessage>;

  @Input() roomId: string;
  @Input() user: SocialUser;

  chatMessages: ChatMessage[] = [];

  newMessagesCount: number = 0;
  private scrollContainer: any;
  isNearBottom: boolean = true;
  sentMessage: boolean = false;

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

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
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
    this.sentMessage = true;

    this.formValues.nativeElement.reset();
    this.webSocketService.sendChatMessageRequest(this.roomId, chatMessage);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // Scroll automatically:

  private onItemElementsChanged(): void {
    if (this.isNearBottom || this.sentMessage) {
      this.scrollToBottom();
      this.sentMessage = false;
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
    if (this.isNearBottom) {
      this.newMessagesCount = 0;
    }
  }

  // WebSocket handlers:

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
    this.newMessagesCount += 1;
  }

  // Subscriptions:

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
