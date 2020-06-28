import { MovielistComponent } from './components/movielist/movielist.component';
import { MovieRoomComponent } from './components/movie-room/movie-room.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { EmptyComponent } from './components/empty/empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { CommentComponent } from './components/comment/comment.component';
import { MoviePlayerComponent } from './components/movie-player/movie-player.component';
import { WebRTCChatModule } from './components/webrtc-chat/webrtc-chat.module';
import { MenuComponent } from './components/menu/menu.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActionsComponent } from './components/actions/actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("989131655048-3aj5o2omgm1fht1itf1v4j8r6lutnoss.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    MovieRoomComponent,
    EmptyComponent,
    ChatComponent,
    CommentComponent,
    MoviePlayerComponent,
    MenuComponent,
    UserInfoComponent,
    ChatRoomComponent,
    UserMenuComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatVideoModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    WebRTCChatModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
