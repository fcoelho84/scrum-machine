import './index.css'
import Slot from 'Components/Slot';
import { useEffect } from 'react';
import { useMakeItRain } from 'hooks/makeItRain';
import { useSlots } from 'hooks/slotValues';
import Buttons from 'Components/Buttons';
import Lever from 'Components/Lever';
import { SlotUser } from 'interfaces';
import { useSlotStatus } from 'hooks/slotStatus';


function Room() {
  const [slotValues] = useSlots();
  const slotStatus = useSlotStatus();
  const startRaining = useMakeItRain();

  const renderSlot = (slot: SlotUser, index: number) => {
    return <Slot key={index} index={index} {...slot}/>
  }

  useEffect(() => {
    if(slotStatus.isRunning || slotStatus.isStopped) return;
    const countDifferentResults = new Set();
    slotValues.forEach(({value, voted}) => {
      if(voted) {
        countDifferentResults.add(value)
      }
    });
    if(countDifferentResults.size === 1 && slotValues.length > 1 && !countDifferentResults.has('?')) {
      startRaining();
    }
  }, [slotStatus, slotValues, startRaining])

  return (
    <div className='room'>
      <div className='room-slot-list' >
        {slotValues.map(renderSlot)}
        <Lever />
      </div>
      <Buttons />
    </div>  
  );
}

export default Room;
