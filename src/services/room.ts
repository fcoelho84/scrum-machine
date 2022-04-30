import { Subject } from "rxjs";
import { User } from '../interfaces/index';

class Room {
    private user$ = new Subject<User>();
    private roomId: string = '';
    private users: User[] = [];

    public setUser = (user: User) => {
        this.roomId = user.roomId;
        this.user$.next(user);
    }

    public observeUser = () => {
        return this.user$.asObservable();
    }

    public setUsers = (users: User[]) => {
        this.users = users;
    }

    public getUsers = () => {
        return this.users;
    }

    public getShareLink = () => {
        return `${window.location.origin}?roomId=${this.roomId}`
    }
}


export default new Room();