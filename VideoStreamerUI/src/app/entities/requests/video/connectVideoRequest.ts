import { VideoInfo } from '../../videoInfo';

export class ConnectVideoRequest {

    videoInfo: VideoInfo;

    constructor(videoInfo: VideoInfo) {
        this.videoInfo = videoInfo;
    }
}
