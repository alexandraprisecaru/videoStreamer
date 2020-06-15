import { Injectable } from '@angular/core';

@Injectable()
export class MediaStreamService {
  private mediaStream: MediaStream = undefined;

  public getMediaStream(isAudioEnabled: boolean, isVideoEnabled: boolean): Promise<MediaStream> {

    let constraints = isAudioEnabled && isVideoEnabled
      ? { audio: true, video: true }
      : (isAudioEnabled
        ? { audio: true } 
        : { video: true });

    if (!this.mediaStream) {
      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream: MediaStream) => {
          return Promise.resolve(stream);
        })
        .catch((err: MediaStreamError) => {
          console.error('Error accessing the hardware:', err);
          return Promise.reject(err);
        });
    } else {
      return Promise.resolve(this.mediaStream);
    }
  }
}