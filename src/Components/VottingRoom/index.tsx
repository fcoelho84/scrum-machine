import './index.css'
import Machine from 'Components/SlotMachine';
import Slot from 'Components/Slot';
import { useEffect } from 'react';
import { useMakeItRain } from 'hooks/makeItRain';
import { SlotData, useSlotValues } from 'hooks/slotValues';
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';


function Room() {
  const [slotValues] = useSlotValues();
  const animationStatus = useAnimationProgress(slotValues.length);
  const startRaining = useMakeItRain();

  const renderSlot = (slot: SlotData, position: number) => {
    const data = slotValues.find(value => value.id === slot.id) ?? { value: 'A' }
    const config = {
      id: slot.id, 
      position,
      value: data.value
    }
    return <Slot key={config.id} {...config}/>
  }

  useEffect(() => {
    if(animationStatus !== enStatus.IDLE) return;
    const countDifferentResults = new Set();
    slotValues.forEach(({value}) => countDifferentResults.add(value));
    if(countDifferentResults.size === 1 && slotValues.length > 1) {
      startRaining();
    }
  }, [animationStatus, slotValues, startRaining])

  return (
    <div className='room'>
      <Machine disabled={animationStatus !== enStatus.STOPPED}>
        {slotValues.map(renderSlot)}
      </Machine>
    </div>  
  );
}

export default Room;
