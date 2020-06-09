import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService, SocialUser } from 'angularx-social-login';
import { WebSocketsService } from '../services/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'videostreamer';
  signinForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService, private webSocketService: WebSocketsService) {
  }

  ngOnInit() {
    this.webSocketService.start();
  }

  ngOnDestroy(): void {
    this.webSocketService.stop();
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  signOut(): void {
    this.authService.signOut();
  }
}