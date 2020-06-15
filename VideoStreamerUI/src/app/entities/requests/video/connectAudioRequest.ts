import { VideoInfo } from '../../videoInfo';

export class ConnectAudioRequest {

    videoInfo: VideoInfo;

    constructor(videoInfo: VideoInfo) {
        this.videoInfo = videoInfo;
    }
}
