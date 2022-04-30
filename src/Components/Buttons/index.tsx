import Socket from 'services/socket';
import './index.css'
import roomService from 'services/room';
import { useSlotStatus } from 'hooks/slotStatus';
import { SocketKeys } from 'interfaces';

function Buttons() {
  const slotStatus = useSlotStatus();
  const values  = ['🤷‍♂️', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '1 mês + teste', '🔗'];

  const onClick = (value: string) => () => {
    if(value === '🔗') {
      return window.alert(roomService.getShareLink());
    }
    const vote = value === '1 mês + teste' ? '∞' : value;
    Socket.emit(SocketKeys.voted, vote);
  }


  console.log(slotStatus.isStopped);
  
  return (
    <div className='button-area'>
      {values.map(value => (
          <div 
            data-disabled={!slotStatus.isStopped} 
            className="button" 
            onClick={onClick(value)}
          >
              <span>{value}</span>
          </div>
      ))}
    </div>
  );
}

export default Buttons;
