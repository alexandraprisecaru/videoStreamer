import { Component, Input, OnChanges } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnChanges {

  @Input() room: MovieRoom;
  @Input() user: SocialUser;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }
  }

}
