import { Movie } from './movie';
import { SocialUser } from 'angularx-social-login';

export class MovieRoom {
    roomId: string;
    movie: Movie;

    // list of users that have joined this room at least once
    users: SocialUser[];

    // video stream
    stream: string;
    timeWatched: string;
}