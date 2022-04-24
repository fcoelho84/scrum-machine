import { useEffect, useState } from "react";
import socket from "../services/socket";

export enum enStatus {
  RUNNING = 2,
  IDLE = 1,
  STOPPED = 0
}

export const useAnimationProgress = (slotCount: number | null = null) => {
    const [status, setStatus] = useState(enStatus.STOPPED);

    useEffect(() => {
      socket.receive('slot-animate', (isRuning: boolean) => {
        setStatus(isRuning ? enStatus.RUNNING : enStatus.STOPPED);
        if(!isRuning || slotCount === null) return; 
        const timeout = setTimeout(() => {
          setStatus(enStatus.IDLE);
          clearTimeout(timeout);
        }, (3000 + (slotCount - 1) * 200))
      });
    }, [slotCount])

    return status;
}