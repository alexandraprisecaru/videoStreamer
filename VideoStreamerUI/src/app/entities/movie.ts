export class Movie {

  Id: string;
  Title: string;

  Synopsis: string;
  StreamUrl: string;
  Image: string;

  constructor(title: string, synopsis: string, streamUrl: string, image: string) {
    this.Title = title;
    this.Synopsis = synopsis;
    this.StreamUrl = streamUrl;
    this.Image = image;
  }
}
