import { SocketKeys } from 'interfaces';
import { HOST, SOCKET_PORT } from 'settings';
import io from 'socket.io-client';

class Socket {
    private socket = io(`${HOST}:${SOCKET_PORT}`);

    public emit<T = any>(key: SocketKeys, value: T) {
        this.socket.emit(key, value)
    }
    public receive<T = any>(key: SocketKeys, callbackFn: (params: T) => void) {
        this.socket.on(key, params => {
            callbackFn(params);
        })
    }
}

export default new Socket();