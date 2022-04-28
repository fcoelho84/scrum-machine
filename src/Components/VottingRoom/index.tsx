import './index.css'
import Machine from 'Components/SlotMachine';
import Slot from 'Components/Slot';
import { useEffect } from 'react';
import { useMakeItRain } from 'hooks/makeItRain';
import { SlotData, useSlotValues } from 'hooks/slotValues';
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import Lamp from 'Components/Lamp';


function Room() {
  const [slotValues] = useSlotValues();
  const animationStatus = useAnimationProgress();
  const startRaining = useMakeItRain();

  const renderSlot = (slot: SlotData, position: number) => {
    const data = slotValues.find(value => value.id === slot.id) ?? { value: 'A' }
    const config = {
      ...slot,
      position,
      value: data.value
    }
    return <Slot key={config.id} {...config}/>
  }

  useEffect(() => {
    if(animationStatus !== enStatus.IDLE) return;
    const countDifferentResults = new Set();
    let count = 0;
    slotValues.forEach(({value}) => {
      if(value === '?') {
        count = count + 1;
      }
      countDifferentResults.add(value)
    });
    console.log(countDifferentResults.size, slotValues.length)
    if(countDifferentResults.size <= 3 && slotValues.length > 1) {
      startRaining();
    }
  }, [animationStatus, slotValues, startRaining])

  return (
    <div className='room'>
      <Machine>
        {slotValues.map(renderSlot)}
      </Machine>
    </div>  
  );
}

export default Room;
