import { Component, Input, OnChanges, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { WebRTCClient } from './shared/webrtc-client.model';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { Observer, BehaviorSubject } from 'rxjs';
import { VideoInfo } from 'src/app/entities/videoInfo';
import { CookieService } from 'ngx-cookie-service';
import { SocialUser } from 'angularx-social-login';
import { StoppedMediaNotification } from 'src/app/entities/requests/video/stoppedMediaNotfication';
import { MovieRoom } from 'src/app/entities/movieRoom';

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
  isVideoEnabled = false;

  isMuted = false;
  socketId: string;

  constructor(
    private webrtcClientStoreService: WebRTCClientStore,
    private webrtcConnectionService: WebRTCConnectionService,
    private cookieService: CookieService,
    private webSocketService: WebSocketsService
  ) {
    this.createStoppedVideoNotificationSubscription();
    this.createStoppedAudioNotificationSubscription();
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

    this.isAudioEnabled = this.cookieService.get("isAudioEnabled") === "true";
    this.isVideoEnabled = this.cookieService.get("isVideoEnabled") === "true";

    let videoInfo = new VideoInfo(this.user.id, this.roomId, this.isAudioEnabled, this.isVideoEnabled);
    this.webrtcConnectionService.connectVideoAndAudio(this.user, videoInfo);
  }

  stopPropagation($event: Event) {
    event.stopPropagation();
  }

  private createStoppedVideoNotificationSubscription() {
    let self = this;
    const stoppedVideoObserver: Observer<StoppedMediaNotification> = {
      next: function (stoppedVideo: StoppedMediaNotification): void {
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

  processUserStoppedVideo(stoppedMediaNotification: StoppedMediaNotification) {
    this.webrtcClients.forEach(client => {
      if (client.user.id === stoppedMediaNotification.User.id) {
        if (client.user.id === this.user.id) {
          return;
        }
        client.stream.getVideoTracks()[0].enabled = !client.stream.getVideoTracks()[0].enabled;
      }
    });
  }

  private createStoppedAudioNotificationSubscription() {
    let self = this;
    const stoppedAudioObserver: Observer<StoppedMediaNotification> = {
      next: function (stoppedAudio: StoppedMediaNotification): void {
        self.processUserStoppedAudio(stoppedAudio);
      },

      error: function (err: any): void {
        console.error('Error: %o', err);
      },

      complete: function (): void {
        console.log('No video info updates');
      }
    };

    this.webSocketService.subscribeToUserStoppedAudio(stoppedAudioObserver);
  }

  processUserStoppedAudio(stoppedMediaNotification: StoppedMediaNotification) {
    this.webrtcClients.forEach(client => {
      if (client.user.id === stoppedMediaNotification.User.id) {
        if (client.user.id === this.user.id) {
          return;
        }

        client.stream.getAudioTracks()[0].enabled = !client.stream.getAudioTracks()[0].enabled;
      }
    });
  }
}