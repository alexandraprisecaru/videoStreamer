import { VideoInfo } from '../../videoInfo';

export class DisconnectVideoRequest {

    videoInfo: VideoInfo;

    constructor(videoInfo: VideoInfo) {
        this.videoInfo = videoInfo;
    }
}
