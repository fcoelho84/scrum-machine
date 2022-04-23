import { useEffect, useState } from 'react';
import socket from '../services/socket';
import './index.css'


interface props {
  position: number;
  id: string;
  value: string;
  count: number;
}

function Slot({id, position, value, count}: props) {
  const [animationClass, setAnimationClass] = useState('');
  const values  = ['🤷‍♂️', '0', '🐰', '0.5', '🐢', '1', '🐳', '3', '⭐️', '5', '🌈', '8', '🍟', '13', '🍩','21','💎', '∞', '🚽'];

  const renderSlotValue = (value: string) => (
    <div className='slot slot-random'>
      <span>{value}</span>
    </div>
  )


  useEffect(() => {
    socket.receive('slot-animate', (startAnimation: boolean) => setAnimationClass(startAnimation ? 'slot-spinner-animate' : ''));
  }, [])

  return (
    <div className="slot-viewport">
      <div className={['slot-spinner', animationClass].join(' ')} style={{animationDelay: `${position * 200}ms`}}>
        <div className='slot'>
          <span style={value === '0.5' || value === '🤷‍♂️' ? {fontSize: '4vw'} : {}}>{value || 'A'}</span>
        </div>
        {renderSlotValue('?')}
        {Array.from(Array(16)).map(() => renderSlotValue(values[Math.floor(Math.random() * ((values.length - 1) - 0 + 1) + 0)]))}
      </div>
    </div>
  );
}

export default Slot;
