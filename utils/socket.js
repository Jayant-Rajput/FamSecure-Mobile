import {io} from 'socket.io-client';
import { API } from "./api.js";

const socket = io(`http://${API}:3000`, {
    transports: ['websocket'],
    autoConnect: false,
});

export default socket;  