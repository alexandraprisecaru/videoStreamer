import { VideoInfo } from '../../videoInfo';

export class DisconnectAudioRequest {

    videoInfo: VideoInfo;

    constructor(videoInfo: VideoInfo) {
        this.videoInfo = videoInfo;
    }
}
