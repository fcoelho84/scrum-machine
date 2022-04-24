import { useCallback, useEffect, useMemo, useState } from "react"
import socket from "../services/socket"

type Slot = any;

interface Data {
    id: string;
    value: string;
}

export const useSlotValues = (): [Slot, string[], React.Dispatch<Slot>] => {
    const [values, setValues] = useState<Slot>({});

    const keys = useMemo(() => Object.keys(values), [values]);

    const removeValueFromDisconnectedId = useCallback((currentValues: any, id: string) => {
        const newValues: any = {};
        Object.keys(currentValues).filter((key) => key !== id).forEach(key => {
            newValues[key] = currentValues[key];
        })
        return newValues;
    }, [])
  
    useEffect(() => {
        socket.receive('receiveValue', (data: Data) => {
            setValues((surrValues: Slot) => ({...surrValues, [data.id]: data.value }))
        })
        socket.receive('disconnected', (id: Data['id']) => {
            setValues((currentValues: Slot) => removeValueFromDisconnectedId(currentValues, id))
        })
    }, [removeValueFromDisconnectedId])

    return [values, keys, setValues];
}