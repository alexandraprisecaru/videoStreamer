export class Movie {

  Id: string;
  Title: string;

  Synopsis: string;

  constructor(title: string, synopsis: string) {
    this.Title = title;
    this.Synopsis = synopsis;
  }
}
