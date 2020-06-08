export class MovieRoomRequest {

  private movieId: string;
  private userId: string;

  constructor(movieId: string, userId: string) {
    this.movieId = movieId;
    this.userId = userId;
  }
}
