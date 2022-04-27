import './index.css';
import { HOST } from 'settings';
import { API_PORT } from '../../settings';
import { useRef, useState } from 'react';
import { random } from 'utils';
import { useEffect } from 'react';
import roomService from 'services/room';

const RoomPanel = () => {
    const [ index, setIndex ] = useState(0);
    const [ name, setName ] = useState('');
    const lampColors = useRef([
        'orange', 'green','pink', 'blue', 
        'white', 'pink-2', 'green-2', 'pink-3', 
        'yellow', 'purple', 'white-2', 'red', 'random']);
    const params = new URL(window.location.href).searchParams;
    const roomId = params.get('roomId');

    const changeColor = () => {
        setIndex(index => {
            const newIndex = index + 1;
            if(newIndex > lampColors.current.length - 1) {
                return 0;
            }
            return newIndex;
        })
    }

    const onSubmit = () => {
        fetch(`${HOST}:${API_PORT}/api/room`, { method: 'post' })
        .then(response => response.json())
        .then((response) => roomService.setUser({
            roomId: response.id,
            lampColor: lampColors.current[index], 
            name
        }))
        .catch(error => console.error(error))
    }

    const joinRoom = () => {
        if(!roomId) return;
        roomService.setUser({
            lampColor: lampColors.current[index], 
            roomId,
            name
        })
    }

    useEffect(() => {
        setIndex(random(lampColors.current.length - 1, 0))
    }, [lampColors])

    return (
        <>
            <div data-active={lampColors.current[index]} className='join-lamp lamp' onClick={changeColor}/>
            <div className='join-room'>
                <input placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/>
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
        </>
    )
}

export default RoomPanel;