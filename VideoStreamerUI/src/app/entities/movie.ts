export class Movie {

  Id: string;
  Title: string;

  Synopsis: string;
  StreamUrl: string;

  constructor(title: string, synopsis: string, streamUrl: string) {
    this.Title = title;
    this.Synopsis = synopsis;
    this.StreamUrl = streamUrl;
  }
}
