import './index.css'
import { useEffect, useState } from 'react';
import socketService from 'services/socket';
import { useSlotStatus } from 'hooks/slotStatus';
import { SocketKeys } from 'interfaces';
import { SlotStatus } from 'interfaces';


function Lever() {
  const slotStatus = useSlotStatus(true);

  const swtich = () => {
    const newStatus = slotStatus.isRunning ? SlotStatus.stopped : SlotStatus.running;
    socketService.emit(SocketKeys.slotStatus, newStatus);
  };

  useEffect(() => {
    // if(slotStatus.isIdle) {
    //   return;
    // }
    // setLeverIsOn(slotStatus.isStopped);
  }, [slotStatus])


  return (
    <div 
      data-disabled={slotStatus.isRunning} 
      data-active={slotStatus.isRunning} 
      onClick={swtich} 
      className='lever'>
      <div />
    </div> 
  );
}

export default Lever;
