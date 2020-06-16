import { Component, OnChanges, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnChanges {

  @Input() room: MovieRoom;
  @Input() user: SocialUser;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }
  }
}
