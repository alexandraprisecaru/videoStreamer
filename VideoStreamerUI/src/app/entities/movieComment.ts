import { SocialUser } from 'angularx-social-login';

export class MovieComment {

  Id: string;
  MovieId: string;
  User: SocialUser;

  Comment: string;
  CurrentTime: number;
  Shown: boolean;

  constructor(movieId: string, user: SocialUser, comment: string, currentTime: number) {
    this.MovieId = movieId;
    this.User = user;
    this.Comment = comment;
    this.CurrentTime = currentTime;
  }
}
