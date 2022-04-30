export enum SlotStatus {
    running = 2,
    idle = 1,
    stopped = 0
}


export enum SocketKeys {
    voted = 'voted',
    receiveVote = 'vote-receive',
    slotStatus =  'slot-status',
    slotDisconnected = 'slot-disconnected',
    roomHistory = 'room-history',
    joinRoom = 'room-join',
    resetRoomVotes = 'room-reset-votes'
}

export interface User {
    roomId: string;
    name: string;
}

export interface SlotUser extends User {
    id: string;
    value: string;
    voted: boolean;
}