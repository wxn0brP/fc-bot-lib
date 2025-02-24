import { io, Socket } from "socket.io-client";
const defaultLink = process.env.socketLink || "https://fusion.ct8.pl/bot";

let socket: Socket;

export function initSocket(token: string, link?: string) {
    socket = io(link || defaultLink, {
        transports: ["websocket"],
        auth: {
            token
        },
        autoConnect: false
    });

    return socket;
}

export default socket;