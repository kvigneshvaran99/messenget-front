import io from 'socket.io-client';
let baseURL = `http://192.168.1.178:3000`;

class Socket {
    get getSocket(){
        return io(baseURL)
    }
}
export default (new Socket()).getSocket