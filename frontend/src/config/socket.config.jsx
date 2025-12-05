import {io} from 'socket.io-client'

const socket = io("http://localhost:3000" , {
    withCredentials:true,
      transports: ["websocket", "polling"], // allow both transports
})


export default socket