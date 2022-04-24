import './index.css';
import { HOST } from 'settings';
import { API_PORT } from '../../settings';

const RoomPanel = () => {

    const onSubmit = () => {
        fetch(`${HOST}:${API_PORT}/api/room`, {method: 'post'})
        .then(response => response.json())
        .then((response) => window.location.href += `?room=${response.id}`)
        .catch(error => console.error(error))
    }

    return (
        <div className='join-room'>
            <button onClick={onSubmit}>
                Criar Sala
            </button>
        </div>
    )
}

export default RoomPanel;