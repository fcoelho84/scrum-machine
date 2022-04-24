import { useCallback, useEffect, useMemo, useState } from "react"
import { API_PORT, HOST } from "settings";
import socket from "../services/socket"
export interface SlotData {
    id: string;
    value: string;
}

type Slot = SlotData[];


export const useSlotValues = (): [Slot, React.Dispatch<Slot>] => {
    const [values, setValues] = useState<Slot>([]);
  
    useEffect(() => {
        socket.receive('history', (users: Slot) => setValues(users))

        socket.receive('receiveValue', (data: SlotData) => {
            setValues((currentValues: Slot) => {
                const user = currentValues.find(user => user.id === data.id);
                if(user) {
                    return currentValues.map(user => {
                        if(user.id === data.id) {
                            return data
                        }
                        return user;
                    })
                }
                return [...currentValues, data];
            })
        })
        socket.receive('disconnected', (id: SlotData['id']) => {
            setValues((currentValues: Slot) => currentValues.filter(value => value.id !== id))
        })
    }, [])

    return [values, setValues];
}