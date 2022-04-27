import { PropsWithChildren } from 'react';
import Socket from 'services/socket';
import './index.css'
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import roomService from 'services/room';
import { useState } from 'react';
import { useEffect } from 'react';

function Machine(props: PropsWithChildren<any>) {
  const animationStatus = useAnimationProgress();
  const [isActive, setIsActive] = useState(false);
  const values  = ['🤷‍♂️', '0', '0.5', '1', '3', '5', '8', '13', '20', '1 mês + teste', '🔗'];

  const onClick = (value: string) => () => {
    if(value === '🔗') {
      window.alert(roomService.getShareLink());
    } else {
      if(value.length >  2) {
        value = '∞'
      }
      Socket.emit('sendValue', value)
    }
  }

  const swtich = () => {
    if(!isActive) {
      Socket.emit('slot-animate', true)
    } else {
      Socket.emit('slot-animate', false)
    }
    setIsActive(active => !active);
  }

  useEffect(() => {

    if(animationStatus === enStatus.STOPPED) {
      setIsActive(false);
    }

  }, [animationStatus])

  return (
    <>
      <div data-disabled={animationStatus === enStatus.RUNNING} className='machine-lever'>
        <span>Reiniciar</span>
        <input type="checkbox" checked={isActive} onChange={swtich} name="lever" className="lever" id="lever" value="lever value" role="switch" aria-label="lever" />
        <span>Rodar</span>
      </div>
      <div className='machine-case-screen'>
        <div>
          <div className='machine-screen'>
            {props.children}
          </div>
        </div>
      </div> 
        <div className='machine-button-area'>
          {values.map(value => (
              <div 
                data-disabled={isActive} 
                className="machine-button" 
                onClick={onClick(value)}
              >
                  <span>{value}</span>
              </div>
          ))}
        </div>
    </>
  );
}

export default Machine;
