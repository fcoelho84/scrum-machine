import { useEffect, useState } from "react";
import socket from "../services/socket";
import roomService from 'services/room';

export enum enStatus {
  RUNNING = 2,
  IDLE = 1,
  STOPPED = 0
}

export const useAnimationProgress = (disableIdle: boolean = false) => {
    const [status, setStatus] = useState(enStatus.STOPPED);

    useEffect(() => {
      socket.receive('slot-animate', (isRunning: boolean) => {
        console.log('isRunning', isRunning)
        setStatus(isRunning ? enStatus.RUNNING : enStatus.STOPPED);
        const slotCount  = roomService.getUsers().length;
        if(!isRunning || disableIdle) return; 
        const timeout = setTimeout(() => {
          setStatus(enStatus.IDLE);
          clearTimeout(timeout);
        }, (3000 + (slotCount - 1) * 200))
      });
    }, [])

    return status;
}