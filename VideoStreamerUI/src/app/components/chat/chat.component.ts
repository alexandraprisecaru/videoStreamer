import { Component, Input, OnChanges, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { ChatMessage } from 'src/app/entities/chatMessage';
import { SocialUser } from 'angularx-social-login';
import { WebSocketsService } from 'src/app/services/websocket.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @ViewChild('msgForm') formValues;
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ChatMessage>;

  @Input() roomId: string;
  @Input() user: SocialUser;

  newMessagesCount: number = 0;

  constructor(private webSocketService: WebSocketsService) {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.roomId || !this.user) {
      return;
    }
  }
}
