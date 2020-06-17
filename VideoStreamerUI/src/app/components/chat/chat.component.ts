import { Component, Input, OnChanges, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { ChatMessage } from 'src/app/entities/chatMessage';
import { SocialUser } from 'angularx-social-login';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @ViewChild('msgForm') formValues;
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ChatMessage>;

  @Input() room: MovieRoom;
  @Input() user: SocialUser;

  newMessagesCount: number = 0;
  isUsersTabSelected: boolean = false;

  constructor(private webSocketService: WebSocketsService) {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }
  }

  selectionChange(event: MatTabChangeEvent) {
    console.log(event.index);
    this.isUsersTabSelected = event.index === 0;
  }
}
