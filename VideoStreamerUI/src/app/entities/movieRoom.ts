import { Movie } from './movie';
import { SocialUser } from 'angularx-social-login';
import { MovieRoomAction } from './movieRoomAction';

export class MovieRoom {
    Id: string;
    Movie: Movie;

    // list of users that have joined this room at least once
    Users: SocialUser[];

    // video stream
    Stream: string;
    TimeWatched: number;

    constructor(movie: Movie, users: SocialUser[], stream: string, timeWatched: number) {
        this.Movie = movie;
        this.Users = users;
        this.Stream = stream;
        this.TimeWatched = timeWatched;
    }
}
