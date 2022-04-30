import { useEffect, useState } from "react";
import socket from "../services/socket";
import { SlotStatus, SocketKeys } from "interfaces";


export const useSlotStatus = () => {
    const [status, setStatus] = useState(SlotStatus.stopped);

    useEffect(() => {
      socket.receive<SlotStatus>(SocketKeys.slotStatus, setStatus);
    }, [])

    return {
      isRunning: status === SlotStatus.running,
      isStopped: status === SlotStatus.stopped
    };
}