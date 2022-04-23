import './index.css';

const RoomPanel = () => {

    const onSubmit = () => {
        const roomId = 'teste' ;
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