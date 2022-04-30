import { useEffect, useState } from "react"
import socket from "../services/socket"
import roomService from 'services/room';
import { SlotUser, SocketKeys } from 'interfaces';

export const useSlots = (): [SlotUser[], React.Dispatch<SlotUser[]>] => {
    const [slots, setSlots] = useState<SlotUser[]>([]);

    useEffect(() =>{
        roomService.setUsers(slots)
    }, [slots])
  
    useEffect(() => {
        socket.receive(SocketKeys.resetRoomVotes, () => {
            setSlots(slots => slots.map(slot => {
                slot.voted = false;
                return slot;
            }))
        })
        socket.receive<SlotUser[]>(SocketKeys.roomHistory, setSlots)
        socket.receive<SlotUser>(SocketKeys.receiveVote, (updatedSlot) => {
            setSlots((slots) => {
                const user = slots.find(slot => slot.id === updatedSlot.id);
                if(user) {
                    return slots.map(user => {
                        if(user.id === updatedSlot.id) {
                            return updatedSlot
                        }
                        return user;
                    })
                }
                return [...slots, updatedSlot];
            })
        })
        socket.receive<string>(SocketKeys.slotDisconnected, (id) => {
            setSlots((slots) => slots.filter(slot => slot.id !== id))
        })
    }, [])

    return [slots, setSlots];
}