import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { WebSocketsService } from '../services/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'videostreamer';
  signinForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  
  constructor(private authService: AuthService, private webSocketService: WebSocketsService) { }
  
  ngOnInit() {
    this.webSocketService.start();
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  signOut(): void {
    this.authService.signOut();
  }
}