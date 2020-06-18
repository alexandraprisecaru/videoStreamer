import { Movie } from './movie';
import { UserInRoom } from './userInRoom';

export class MovieRoom {
    Id: string;
    Movie: Movie;

    // list of users that have joined this room at least once
    UsersInRoom: UserInRoom[];

    // video stream
    Stream: string;
    TimeWatched: number;

    constructor(movie: Movie, usersInRoom: UserInRoom[], stream: string, timeWatched: number) {
        this.Movie = movie;
        this.UsersInRoom = usersInRoom;
        this.Stream = stream;
        this.TimeWatched = timeWatched;
    }
}
