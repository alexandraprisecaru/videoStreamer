import { SocialUser } from 'angularx-social-login';

export class SaveUserRequest {
  public user: SocialUser;

  constructor(user: SocialUser) {
    this.user = user;
  }
}
