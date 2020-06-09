import { SocialUser } from 'angularx-social-login';

export class MovieComment {

  Id: string;
  MovieId: string;
  User: SocialUser;

  Comment: string;
  CurrentTime: number;
}
