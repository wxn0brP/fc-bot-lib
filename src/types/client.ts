import { Socket } from "socket.io-client";
import { EnableCmd_opts, Id } from "./types";
import { EventEmitter } from "stream";
import CommandEngine from "../cmd";

export interface Client {
    socket: Socket;
    botInfo: {
        _id: Id;
        name: string;
    };
    on: EventEmitter["on"];
    emitEvent: (event: string, ...args: any[]) => boolean;
    cmd: CommandEngine;
    login: (token: string) => Promise<void>;
    enableCmd: (prefix: string, dirPath: string, opts?: EnableCmd_opts) => Promise<void>;
}