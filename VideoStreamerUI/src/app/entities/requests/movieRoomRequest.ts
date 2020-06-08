export class MovieRoomRequest {

  public movieId: string;
  public userId: string;

  constructor(movieId: string, userId: string) {
    this.movieId = movieId;
    this.userId = userId;
  }
}
