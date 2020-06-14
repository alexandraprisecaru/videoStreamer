import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { WebRTCChatComponent } from './webrtc-chat.component';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';
import { MediaStreamService } from '../shared/mediastream.service';

@NgModule({
  declarations: [
    WebRTCChatComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    WebRTCChatComponent
  ],
  providers:[
    WebRTCClientStore,
    WebRTCConnectionService,
    MediaStreamService
  ]
})
export class WebRTCChatModule { }