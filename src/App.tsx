
import './App.css'
import CreateRoom from 'Components/CreateRoom';
import VottingRoom from 'Components/VottingRoom';
import { useEffect, useState } from 'react';
import socket from 'services/socket';


function App() {
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    if(params.get('room')) {
      const roomId = String(params.get('room'));
     socket.emit('join', { roomId });
     setRoomId(roomId)
    }
  }, [])


  const hasRoom = roomId.length > 0; 

  return (
    <div className='main'>
      <div className='main'>
        {!hasRoom && <CreateRoom />}
        {hasRoom && <VottingRoom/>}
      </div>  
    </div>
  );
}

export default App;
