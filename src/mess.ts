import { ClientType } from ".";
import { Embed, MessRaw } from "./types/types";

class Mess implements MessRaw {
    readonly fr: string;
    readonly to: string;
    readonly chnl: string;
    readonly msg: string;
    readonly _id: string;
    readonly res?: string;
    readonly enc?: string;
    readonly embed?: Embed;
    readonly [key: string]: any;

    client: ClientType;
    frMeta: string;

    constructor(client: ClientType, mess: MessRaw) {
        this.client = client;
        Object.assign(this, mess);

        const fr = mess.fr;
        if (fr.startsWith("%")) {
            this.frMeta = "webhook";
        } else if (fr.startsWith("^")) {
            this.frMeta = "bot";
        } else {
            this.frMeta = "user";
        }
    }

    reply(txt: string) {
        this.client.socket.emit("mess", {
            to: this.to,
            msg: txt,
            chnl: this.chnl,
            res: this._id
        });
    }
}

export default Mess;