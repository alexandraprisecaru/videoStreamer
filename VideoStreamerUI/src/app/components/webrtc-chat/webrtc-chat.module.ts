import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { WebRTCChatComponent } from './webrtc-chat.component';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';
import { MediaStreamService } from '../shared/mediastream.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    WebRTCChatComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    WebRTCChatComponent
  ],
  providers: [
    WebRTCClientStore,
    WebRTCConnectionService,
    MediaStreamService
  ]
})
export class WebRTCChatModule { }