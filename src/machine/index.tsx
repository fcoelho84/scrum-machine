import { PropsWithChildren } from 'react';
import Socket from '../services/socket';
import './index.css'

function Machine(props: PropsWithChildren<any>) {
  const values  = ['🤷‍♂️', '0', '0.5', '1', '3', '5', '8', '13', '21', '∞'];

  const onClick = (value: string) => () => {
      Socket.emit('sendValue', value)
  }

  const spin = () => {
    Socket.emit('slot-animate', true)
  }

  const reset = () => {
      Socket.emit('slot-animate', false)
  }

  return (
    <>
      <div className='machine-case-top' > 
        <div/>
      </div>
      <div className='machine-case-screen'>
        <div>
          <span>Scrum Machine</span>
          <div className='machine'>
            <div className='machine-middle-line'/>
            {props.children}
          </div>
        </div>
      </div>
      <div className='machine-case-table'> 
        <div>
          {values.map(value => (
              <div className="machine-case-table-button" onClick={onClick(value)}>
                  <span>{value}</span>
              </div>
          ))}
        </div>
      </div>
      <div className='machine-case-front'>
        <div> 
          <div className='machine-reward'>
            <div></div>
          </div>
          <div className="machine-case-table-button-front" onClick={spin}>
              <span>Girar</span>
          </div>
          <div className="machine-case-table-button-front" onClick={reset}>
              <span>Reiniciar</span>
          </div>
        </div>
      </div>
      <div className='machine-case-front-body'>
        <div/>
      </div>
    </>
  );
}

export default Machine;
