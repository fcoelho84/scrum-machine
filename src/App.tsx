
import './App.css'
import CreateRoom from 'Components/CreateRoom';
import VottingRoom from 'Components/VottingRoom';
import { useEffect, useState } from 'react';
import socket from 'services/socket';
import roomService from 'services/room';
import { map, tap } from 'rxjs';
import { SocketKeys } from 'interfaces';


function App() {
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const stream$ = roomService.observeUser()
    .pipe(
      tap(user => socket.emit(SocketKeys.joinRoom, user)),
      map(user => user.roomId)
    )
    .subscribe(setRoomId);

    return () => {
      stream$.unsubscribe();
    }
  }, [])

  const hasRoom = roomId.length > 0; 
  return (
    <div className='main'>
      {!hasRoom && <CreateRoom />}
      {hasRoom && <VottingRoom/>}
    </div>  
  );
}

export default App;
