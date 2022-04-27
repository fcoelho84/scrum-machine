import { Subject } from "rxjs";

interface User {
    roomId: string;
    name: string;
    lampColor: string;
}

interface Slot {
    id: string;
    value: string;
    name: string;
    lampColor: string;
}

class Room {
    private user$ = new Subject<User>();
    private roomId: string = '';
    private users: Slot[] = [];

    public setUser = (user: User) => {
        this.roomId = user.roomId;
        this.user$.next(user);
    }

    public observeUser = () => {
        return this.user$.asObservable();
    }

    public setUsers = (users: Slot[]) => {
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