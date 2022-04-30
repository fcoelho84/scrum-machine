import './index.css'
import socketService from 'services/socket';
import { useSlotStatus } from 'hooks/slotStatus';
import { SocketKeys } from 'interfaces';
import { SlotStatus } from 'interfaces';


function Lever() {
  const slotStatus = useSlotStatus();

  const swtich = () => {
    const newStatus = slotStatus.isRunning ? SlotStatus.stopped : SlotStatus.running;
    socketService.emit(SocketKeys.slotStatus, newStatus);
  };

  return (
    <div 
      data-active={slotStatus.isRunning} 
      onClick={swtich} 
      className='lever'>
      <div />
    </div> 
  );
}

export default Lever;
