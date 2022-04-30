import './index.css'
import Slot from 'Components/Slot';
import { useEffect } from 'react';
import { useMakeItRain } from 'hooks/makeItRain';
import { useSlots } from 'hooks/slotValues';
import Buttons from 'Components/Buttons';
import Lever from 'Components/Lever';
import { SlotUser } from 'interfaces';
import { useSlotStatus } from 'hooks/slotStatus';
import { useRef } from 'react';
import roomService from 'services/room';
import { useCallback } from 'react';


function Room() {
  const [slotValues] = useSlots();
  const slotStatus = useSlotStatus();
  const startRaining = useMakeItRain();
  const debouce = useRef<NodeJS.Timeout>()

  const renderSlot = (slot: SlotUser, index: number) => {
    return <Slot key={index} index={index} {...slot}/>
  }

  const calcReward = useCallback(() => {
    const countDifferentResults = new Set();
    slotValues.forEach(({value, voted}) => {
      if(voted) {
        countDifferentResults.add(value)
      }
    });
    if(countDifferentResults.size === 1 && slotValues.length > 1 && !countDifferentResults.has('?')) {
      startRaining();
    }
  }, [slotValues, startRaining])

  useEffect(() => {
    if(slotStatus.isRunning) {
      if(debouce.current) {
        clearTimeout(debouce.current)
      }
      const slotCount  = roomService.getUsers().length;
      const spinningDuration = (3000 + (slotCount - 1) * 200);
      debouce.current = setTimeout(() => calcReward(), spinningDuration)
    }
  }, [calcReward, slotStatus.isRunning])

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
