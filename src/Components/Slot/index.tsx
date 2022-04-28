import Lamp from 'Components/Lamp';
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import './index.css'
interface props {
  position: number;
  id: string;
  value: string;
  lampColor: string;
  name: string;
}

function Slot({ position, value, ...props }: props) {
  const status = useAnimationProgress(true);
  const values  = ['🤷‍♂️', '0', '🐰', '0.5', '🐢', '1', '🐳', '3', '⭐️', '5', '🌈', '8', '🍟', '13', '🍩','21','💎', '∞', '🚽'];

  const renderSlotValue = (value: string) => (
    <div className='slot slot-random'>
      <span>{value}</span>
    </div>
  )
  
  const isSpinning = status === enStatus.RUNNING;
  return (
    <div className='container'>
      <Lamp value={value} {...props} />
      <div className="slot-viewport">
        <div data-animate={isSpinning} className='slot-spinner' style={{animationDelay: `${position * 200}ms`}}>
          <div className='slot'>
            <span>{value || 'A'}</span>
          </div>
          {renderSlotValue('?')}
          {Array.from(Array(16)).map(() => renderSlotValue(values[Math.floor(Math.random() * ((values.length - 1) - 0 + 1) + 0)]))}
        </div>
      </div>
    </div>
  );
}

export default Slot;
