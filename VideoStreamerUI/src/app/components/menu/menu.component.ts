import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {

  @Input() room: MovieRoom;
  @Input() user: SocialUser;
  @Output() userLeftRoomEvent = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }
  }

  userLeftRoom() {
    this.userLeftRoomEvent.emit();
  }
}
