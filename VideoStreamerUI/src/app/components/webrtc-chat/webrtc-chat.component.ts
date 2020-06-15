import { Component, Input, OnChanges } from '@angular/core';

import { WebRTCClient } from './shared/webrtc-client.model';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer } from 'rxjs';
import { VideoInfo } from 'src/app/entities/videoInfo';
import { VideoInfoUpdates } from 'src/app/entities/responses/VideoInfoUpdates';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'webrtc-chat',
  styleUrls: ['./webrtc-client.component.scss'],
  templateUrl: './webrtc-chat.component.html'
})
export class WebRTCChatComponent implements OnChanges {

  @Input() userId: string;
  @Input() roomId: string;

  public webrtcClients: WebRTCClient[];

  isAudioEnabled = false;
  isVideoEnabled = true;

  constructor(
    private webrtcClientStoreService: WebRTCClientStore,
    private webrtcConnectionService: WebRTCConnectionService,
    private webSocketService: WebSocketsService,
    private cookieService: CookieService
  ) {
    this.createVideoInfoUpdatesSubscription();

    let cookieAudio = cookieService.get("isAudioEnabled");
    if (!cookieAudio) {
      cookieService.set("isAudioEnabled", "true");
      this.isAudioEnabled = true;
    } else {
      this.isAudioEnabled = cookieAudio === "true";
    }

    let cookieVideo = cookieService.get("isVideoEnabled");
    if (!cookieVideo) {cookieService
      cookieService.set("isVideoEnabled", "true");
      this.isVideoEnabled = true;
    } else {
      this.isVideoEnabled = cookieVideo === "true";
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if (!this.roomId || !this.userId) {
      return;
    }

    this.webrtcClientStoreService.clients$.subscribe(
      clientList => {
        this.webrtcClients = clientList.filter(c => c.roomId === this.roomId).toArray();
      }
      ,
      err => console.error('Error updating the client list:', err)
    );

    let videoInfo = new VideoInfo(this.userId, this.roomId, this.isAudioEnabled, this.isVideoEnabled);
    this.webrtcConnectionService.connectVideoAndAudio(videoInfo);
  }

  private createVideoInfoUpdatesSubscription() {
    let self = this;
    const videoInfoUpdatesObserver: Observer<VideoInfoUpdates> = {
      next: function (videoInfoUpdates: VideoInfoUpdates): void {
        self.processVideoInfoUpdates(videoInfoUpdates);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No video info updates');
      }
    };

    this.webSocketService.subscribeToVideoInfoUpdates(videoInfoUpdatesObserver);
  }

  processVideoInfoUpdates(videoInfoUpdates: VideoInfoUpdates) {
    throw new Error("Method not implemented.");
  }
}