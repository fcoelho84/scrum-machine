import './index.css';

const RoomPanel = () => {

    const onSubmit = () => {
        const roomId = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
        window.location.href += `?room=${roomId}`
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