import { useEffect, useState } from "react";
import socket from "../services/socket";
import roomService from 'services/room';
import { SlotStatus, SocketKeys } from "interfaces";
import { timeout } from "utils";


export const useSlotStatus = (disableIdle: boolean = false) => {
    const [status, setStatus] = useState(SlotStatus.stopped);

    useEffect(() => {
      socket.receive<SlotStatus>(SocketKeys.slotStatus, (status) => {
        setStatus(status);
        const slotCount  = roomService.getUsers().length;
        const spinningDuration = (3000 + (slotCount - 1) * 200);
        if(status === SlotStatus.running && !disableIdle) {
          timeout(() => setStatus(SlotStatus.idle), spinningDuration)
        }
      });
    }, [disableIdle])

    return {
      isRunning: status === SlotStatus.running,
      isStopped: status === SlotStatus.stopped,
      isIdle: status === SlotStatus.idle
    };
}