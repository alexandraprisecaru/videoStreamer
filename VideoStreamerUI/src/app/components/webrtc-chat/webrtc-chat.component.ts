import { Component, Input, OnChanges } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { WebRTCClient } from './shared/webrtc-client.model';
import { WebRTCClientStore } from './shared/webrtc-client.store.service';
import { WebRTCConnectionService } from './shared/webrtc-client-connection.service';

@Component({
  selector: 'webrtc-chat',
  templateUrl: './webrtc-chat.component.html'
})
export class WebRTCChatComponent implements OnChanges {

  @Input() roomId: string;
  public webrtcClients: WebRTCClient[];
  private blobs: string[] = [];

  constructor(
    private webrtcClientStoreService: WebRTCClientStore,
    private webrtcConnectionService: WebRTCConnectionService,
    private sanitizer: DomSanitizer
  ) {
    this.webrtcClientStoreService.clients$.subscribe(
      clientList => this.webrtcClients = clientList.toArray(),
      err => console.error('Error updating the client list:', err)
    );
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if (!this.roomId) {
      return;
    }

    this.webrtcClientStoreService.clients$.subscribe(
      clientList => this.webrtcClients = clientList.toArray(),
      err => console.error('Error updating the client list:', err)
    );


  }

  public onClickConnectToRoom() {
    this.webrtcConnectionService.connectToRoom();
  }

  // DEPRECATED
  public getVideoStreamURL(stream: MediaStream): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(stream));
  }
}