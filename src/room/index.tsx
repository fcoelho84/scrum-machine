import './index.css'
import Machine from '../machine';
import Slot from '../slot';
import { useState, useEffect } from 'react';
import socket from '../services/socket';

function Room() {
  const [slots, setSlots] = useState<any>({})

  useEffect(() => {

    socket.receive('receiveValue', (data: any) => {
      setSlots((currSlots: any) => ({...currSlots, [data.id]: data.value }))
    })

    socket.receive('disconnected', (id: string) => {
      setSlots((currSlots: any) => {
        const obj: any = {};
        Object.keys(currSlots).filter((key) => key !== id).forEach(key => {
          obj[key] = currSlots[key];
        })
        return obj;
      })
    })
  }, [])

  return (
    <div className='room'>
      <Machine>
        {Object.keys(slots).map((id, key) => <Slot count={Object.keys(slots).length} key={key} id={id} position={key} value={slots[id]}/>)}
      </Machine>
    </div>  
  );
}

export default Room;
