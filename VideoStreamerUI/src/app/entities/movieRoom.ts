import { Movie } from './movie';
import { SocialUser } from 'angularx-social-login';

export class MovieRoom {
    Id: string;
    Movie: Movie;

    // list of users that have joined this room at least once
    Users: SocialUser[];

    // video stream
    Stream: string;
    TimeWatched: number;
}
