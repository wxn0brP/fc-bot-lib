import { EventEmitter } from "events";
import socket, { initSocket } from "./socket.js";
import Mess from "./mess.js";
import cmdEngine from "./cmd.js";
import { EnableCmd_opts, Id } from "./types/types.js";
import { Client } from "./types/client.js";

const eventEmitter = new EventEmitter();

const client: Client = {
    socket: null,
    botInfo: {
        _id: null,
        name: null,
    },
    on: eventEmitter.on,
    emitEvent: eventEmitter.emit,
    cmd: new cmdEngine(),

    login(token: string, link?: string) {
        this.socket = initSocket(token, link);
        initSocketEvent();
        this.socket.connect();

        this.socket.emit("get.bot.info", (data: { _id: Id, name: string }) => client.botInfo = data);
    },

    async enableCmd(prefix: string, dirPath: string, opts: EnableCmd_opts = {}) {
        opts = {
            webhook: false,
            bot: false,
            ...opts
        }
        this.cmd.setPrefix(prefix);
        await this.cmd.loadCommands(dirPath);
        this.cmd.enabled = true;
        this.cmd.opts = opts;
    }
}

function initSocketEvent() {
    client.socket.on("connect", () => client.emitEvent("connect"));
    client.socket.on("disconnect", () => client.emitEvent("disconnect"));
    client.socket.on("connect_error", (...data) => client.emitEvent("connect_error", ...data));
    client.socket.on("error", (...data) => client.emitEvent("error", ...data));
    client.socket.on("mess", async (req) => {
        if (req.fr === client.botInfo._id) return;
        const mess = new Mess(client, req);

        const cmd = await client.cmd.handleInput(mess);
        if (cmd.c == 0) return;
        if (cmd.c == 2) {
            mess.reply(cmd.msg);
            return;
        }

        client.emitEvent("mess", mess);
    });
}

export default client;
export {
    Mess,
    socket,
    eventEmitter,
}