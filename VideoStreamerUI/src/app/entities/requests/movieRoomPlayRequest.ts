export class MovieRoomPlayRequest {

  public roomId: string;
  public userId: string;
  public currentTime: number;

  constructor(roomId: string, userId: string, currentTime: number) {
    this.roomId = roomId;
    this.userId = userId;
    this.currentTime = currentTime;
  }
}
