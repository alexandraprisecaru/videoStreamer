import { MovieComment } from '../movieComment';

export class SendMovieCommentRequest {

  public movieId: string;
  public movieComment: MovieComment;

  constructor(movieId: string, movieComment: MovieComment) {
    this.movieId = movieId;
    this.movieComment = movieComment;
  }
}
