import './index.css';
import { HOST } from 'settings';
import { API_PORT } from '../../settings';
import { useState } from 'react';
import roomService from 'services/room';

const RoomPanel = () => {
    const [ name, setName ] = useState('');
    const params = new URL(window.location.href).searchParams;
    const roomId = params.get('roomId');

    const onSubmit = () => {
        fetch(`${HOST}:${API_PORT}/api/room`, { method: 'post' })
        .then(response => response.json())
        .then((response) => roomService.setUser({
            roomId: response.id,
            name
        }))
        .catch(error => console.error(error))
    }

    const joinRoom = () => {
        if(!roomId) return;
        roomService.setUser({
            roomId,
            name
        })
    }


    return (
        <div className='join-room'>
            <input 
                maxLength={10}
                placeholder='Nome' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            {!roomId && 
                <button onClick={onSubmit}>
                    Criar Sala
                </button>
            }
            {roomId && 
                <button disabled={name.length === 0} onClick={joinRoom}>
                    Entrar
                </button>
            }
        </div>
    )
}

export default RoomPanel;