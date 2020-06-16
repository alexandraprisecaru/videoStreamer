import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { WebRTCClient } from './shared/webrtc-client.model';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer, BehaviorSubject } from 'rxjs';
import { VideoInfo } from 'src/app/entities/videoInfo';
import { VideoInfoUpdates } from 'src/app/entities/responses/VideoInfoUpdates';
import { CookieService } from 'ngx-cookie-service';
import { SocialUser } from 'angularx-social-login';
import { StoppedVideoNotification } from 'src/app/entities/requests/video/stoppedVideoNotfication';

@Component({
  selector: 'webrtc-chat',
  styleUrls: ['./webrtc-client.component.scss'],
  templateUrl: './webrtc-chat.component.html'
})
export class WebRTCChatComponent implements OnChanges {
  @ViewChild('vid') video: ElementRef;

  @Input() user: SocialUser;
  @Input() roomId: string;

  public webrtcClients: WebRTCClient[];

  isAudioEnabled = false;
  isVideoEnabled: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isMuted = false;
  socketId: string;

  constructor(
    private webrtcClientStoreService: WebRTCClientStore,
    private webrtcConnectionService: WebRTCConnectionService,
    private webSocketService: WebSocketsService,
    private cookieService: CookieService
  ) {
    this.createStoppedVideoNotificationSubscription();

    let cookieAudio = cookieService.get("isAudioEnabled");
    if (!cookieAudio) {
      cookieService.set("isAudioEnabled", "true");
      this.isAudioEnabled = true;
    } else {
      this.isAudioEnabled = cookieAudio === "true";
    }

    let cookieVideo = cookieService.get("isVideoEnabled");
    if (!cookieVideo) {
      cookieService.set("isVideoEnabled", "true");
      this.isVideoEnabled.next(true);
    } else {
      this.isVideoEnabled.next(cookieVideo === "true");
    }

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if (!this.roomId || !this.user) {
      return;
    }

    this.socketId = this.webSocketService.socketId;

    this.webrtcClientStoreService.clients$.subscribe(
      clientList => {
        this.webrtcClients = clientList.filter(c => c.roomId === this.roomId).toArray();
      }
      ,
      err => console.error('Error updating the client list:', err)
    );

    let videoInfo = new VideoInfo(this.user.id, this.roomId, this.isAudioEnabled, this.isVideoEnabled.getValue());
    this.webrtcConnectionService.connectVideoAndAudio(this.user, videoInfo);
  }

  hasVideo(client: WebRTCClient) {
    // client.stream.getVideoTracks()[0].muted
    return client.stream.getVideoTracks()[0].enabled;
  }

  triggerAudio() {
    this.isAudioEnabled = !this.isAudioEnabled;
    this.cookieService.set("isAudioEnabled", String(this.isAudioEnabled));
    this.webrtcConnectionService.triggerAudio(this.isAudioEnabled);
  }

  triggerVideo() {
    this.isVideoEnabled.next(!this.isVideoEnabled.getValue());
    this.cookieService.set("isVideoEnabled", String(this.isVideoEnabled.getValue()));
    this.webrtcConnectionService.triggerVideo(this.isVideoEnabled.getValue());
    this.webSocketService.sendStoppedVideoNotification(this.user, this.roomId, this.socketId);
  }

  private createStoppedVideoNotificationSubscription() {
    let self = this;
    const stoppedVideoObserver: Observer<StoppedVideoNotification> = {
      next: function (stoppedVideo: StoppedVideoNotification): void {
        self.processUserStoppedVideo(stoppedVideo);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No video info updates');
      }
    };

    this.webSocketService.subscribeToUserStoppedVideo(stoppedVideoObserver);
  }

  processUserStoppedVideo(stoppedVideoNotfication: StoppedVideoNotification) {
    this.webrtcClients.forEach(client => {
      if (client.user.id === stoppedVideoNotfication.User.id) {
        if (client.user.id === this.user.id) {
          return;
        }
        client.stream.getVideoTracks()[0].enabled = !client.stream.getVideoTracks()[0].enabled;
        // client.setUser(stoppedVideoNotfication.User);
      }
    });
  }
}