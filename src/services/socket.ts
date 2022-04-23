import io from 'socket.io-client';

class Socket {
    private socket = io('http://127.0.0.1:8080');

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