import { useCreateSlot } from 'hooks/useCreateSlot';
import './index.css'
import { useEffect, useMemo } from 'react';
import { SlotUser } from 'interfaces';
import { useSlotStatus } from 'hooks/slotStatus';
import { timeout } from 'utils';

function Slot(props: SlotUser & { index: number }) {
  const slotStatus = useSlotStatus();
  const ringRef = useCreateSlot(props.id);

  useEffect(() => {
    const slot = document.getElementById(props.id);
    if(!slot) return;
    if(slotStatus.isRunning) {
      timeout(() => slot.innerText = props.value, 1000)
    }
  }, [props.id, props.value, slotStatus.isRunning])

  useEffect(() => {
    const slot = document.getElementById(props.id);
    if(!slot || !props.voted) return;
    slot.innerText = '✓';
  }, [props.voted, props.id])

  const spinDirection = slotStatus.isRunning ? String(props.index % 2) : "" 
  
  return (
    <div className='slot-container'>
      <span className="slot-name">{props.name}</span>
      <div className="slot-ring-container">
        <div>
          <div 
            ref={ringRef} 
            className='slot-ring' 
            data-spin={spinDirection} 
          />
        </div>
      </div>
    </div>
  );
}

export default Slot;
