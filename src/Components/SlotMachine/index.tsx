import { PropsWithChildren } from 'react';
import Socket from 'services/socket';
import './index.css'
import { useState } from 'react';
import { enStatus, useAnimationProgress } from 'hooks/animationProgress';
import { useEffect } from 'react';

function Machine(props: PropsWithChildren<{disabled: boolean}>) {
  const [isActive, setIsActive] = useState(false);
  const animationStatus = useAnimationProgress();
  const values  = ['🤷‍♂️', '0', '0.5', '1', '3', '5', '8', '13', '21', '∞'];

  const onClick = (value: string) => () => {
    Socket.emit('sendValue', value)
  }

  const swtich = () => {
    if(!isActive) {
      Socket.emit('slot-animate', true)
    } else {
      Socket.emit('slot-animate', false)
    }
    setIsActive(!isActive)
  }

  useEffect(() => {
    if(animationStatus === enStatus.RUNNING) {
      setIsActive(true);
    }
    if(animationStatus === enStatus.STOPPED) {
      setIsActive(false);
    }
  }, [animationStatus])

  return (
    <>
      <div className='machine-lever'>
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
      <div className='machine-case-table'> 
        <div>
          {values.map(value => (
              <div data-disabled={props.disabled} className="machine-case-table-button" onClick={onClick(value)}>
                  <span>{value}</span>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Machine;
