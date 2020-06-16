import { ImmutableModel } from '../../shared/immutable-model';
import { SocialUser } from 'angularx-social-login';

export interface IWebRTCClient {
  id?: string;
  roomId: string;
  stream: MediaStream;
  user: SocialUser;
}

export class WebRTCClient extends ImmutableModel<IWebRTCClient, WebRTCClient> {
  constructor(data: IWebRTCClient) {
    super(WebRTCClient, data);
  }

  get id(): string {
    return this.data.get('id');
  }

  get roomId(): string {
    return this.data.get('roomId');
  }

  get stream(): MediaStream {
    return this.data.get('stream');
  }

  get user(): SocialUser {
    return this.data.get('user');
  }

  setId(val: string): WebRTCClient {
    return this.setValue('id', val);
  }

  setStream(val: MediaStream): WebRTCClient {
    return this.setValue('stream', val);
  }

  setUser(val: SocialUser): WebRTCClient {
    return this.setValue('user', val);
  }
}