
import './App.css'
import JoinRoom from './joinRoom';
import Room from './room';
import { useEffect, useState } from 'react';
import socket from './services/socket';
function App() {
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    if(params.get('room')) {
      const roomId = String(params.get('room'));
     socket.emit('join', { roomId });
     setRoomId(roomId)
    } 
    socket.receive('error', (message: string) => console.log(message));
  }, [])


  const hasRoom = roomId.length > 0 && roomId.length <= 5; 

  return (
    <div className='main'>
      <div className='main scale'>
        {!hasRoom && <JoinRoom />}
        {hasRoom && <Room/>}
      </div>  
    </div>
  );
}

export default App;
