import {io} from 'socket.io-client';
import { API } from "./api.js";

const socket = io(`https://famsecure.onrender.com`, {
    transports: ['websocket'],
    autoConnect: false,
});

export default socket;  