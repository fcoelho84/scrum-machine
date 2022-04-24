import './index.css'
import Machine from 'Components/SlotMachine';
import Slot from 'Components/Slot';
import { useEffect } from 'react';
import { useMakeItRain } from 'hooks/makeItRain';
import { useSlotValues } from 'hooks/slotValues';
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';


function Room() {
  const [slotValues, slotKeys] = useSlotValues();
  const animationStatus = useAnimationProgress(slotKeys.length);
  const startRaining = useMakeItRain();

  const renderSlot = (id: string, position: number) => {
    const config = {
      id, 
      position,
      value: slotValues[id]
    }
    return <Slot key={id} {...config}/>
  }

  useEffect(() => {
    if(animationStatus !== enStatus.IDLE) return;
    const countDifferentResults = new Set();
    slotKeys.forEach(key => {
      countDifferentResults.add(slotValues[key]);
    });
    if(countDifferentResults.size === 1 && slotKeys.length > 1) {
      startRaining();
    }
  }, [animationStatus, slotValues, slotKeys, startRaining])

  return (
    <div className='room'>
      <Machine>
        {slotKeys.map(renderSlot)}
      </Machine>
    </div>  
  );
}

export default Room;
