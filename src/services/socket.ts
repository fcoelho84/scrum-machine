import { HOST, SOCKET_PORT } from 'settings';
import io from 'socket.io-client';

class Socket {
    private socket = io(`${HOST}:${SOCKET_PORT}`);

    public emit(key: string, value: any) {
        this.socket.emit(key, value)
    }
    public receive(key: string, callbackFn: Function) {
        this.socket.on(key, params => {
            callbackFn(params);
        })
    }
}

export default new Socket();