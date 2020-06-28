import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { MovieRoom } from 'src/app/entities/movieRoom';
import { WebSocketsService } from 'src/app/services/websocket.service';
import { CookieService } from 'ngx-cookie-service';
import { WebRTCConnectionService } from '../webrtc-chat/shared/webrtc-client-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnChanges {

  @Input() room: MovieRoom;
  @Input() user: SocialUser;
  @Output() userLeftRoom = new EventEmitter();
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  areCommentsVisible: boolean = true;

  IS_AUDIO_ENABLED = "isAudioEnabled";
  IS_VIDEO_ENABLED = "isVideoEnabled";
  socketId: string;

  constructor(
    private cookieService: CookieService,
    private webSocketService: WebSocketsService,
    private router: Router,
    private webrtcConnectionService: WebRTCConnectionService) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!this.room || !this.user) {
      return;
    }

    this.socketId = this.webSocketService.socketId;

    let cookieAudio = this.cookieService.get(this.IS_AUDIO_ENABLED);
    if (!cookieAudio) {
      this.cookieService.delete(this.IS_AUDIO_ENABLED);
      this.cookieService.set(this.IS_AUDIO_ENABLED, "true");
      this.isAudioEnabled = true;
    } else {
      this.isAudioEnabled = cookieAudio === "true";
    }

    let cookieVideo = this.cookieService.get(this.IS_VIDEO_ENABLED);
    if (!cookieVideo) {
      this.cookieService.delete(this.IS_VIDEO_ENABLED);
      this.cookieService.set(this.IS_VIDEO_ENABLED, "true");
      this.isVideoEnabled = true;
    } else {
      this.isVideoEnabled = cookieVideo === "true";
    }
  }
  triggerAudio() {
    this.isAudioEnabled = !this.isAudioEnabled;

    this.cookieService.delete(this.IS_AUDIO_ENABLED);
    this.cookieService.set(this.IS_AUDIO_ENABLED, String(this.isAudioEnabled));
    this.webrtcConnectionService.triggerAudio(this.isAudioEnabled);
    this.webSocketService.sendStoppedAudioNotification(this.user, this.room.Id, this.socketId);
  }

  triggerVideo() {
    this.isVideoEnabled = !this.isVideoEnabled;
    this.cookieService.delete(this.IS_VIDEO_ENABLED);
    this.cookieService.set(this.IS_VIDEO_ENABLED, String(this.isVideoEnabled));
    this.webrtcConnectionService.triggerVideo(this.isVideoEnabled);
    this.webSocketService.sendStoppedVideoNotification(this.user, this.room.Id, this.socketId);
  }

  triggerComments() {
    this.areCommentsVisible = !this.areCommentsVisible;
  }
  
  leaveRoom() {
    this.webSocketService.sendLeaveRoomRequest(this.user.id, this.room.Id);
    this.userLeftRoom.emit();
    this.router.navigate([""]);
  }

  /**
   * Checks if the given value is valid, in which case it saves it to cookies under the given name.
   * @param name name of the cookie
   * @param value
   */
  private saveToCookie(name: string, value: string) {
    if (!value || value === "invalid") {
      return;
    }

    let existentCookie = this.cookieService.get(name);
    if (existentCookie === value) {
      return;
    }

    this.cookieService.delete(name);
    this.cookieService.set(name, value);
  }
}
