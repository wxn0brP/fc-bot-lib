export type Id = string;

export interface MessRaw {
    _id: Id;
    fr: Id;
    to: Id;
    msg: string;
    chnl: Id;
    res?: Id;
    enc?: string;
    embed?: Embed;
    [key: string]: any;
}

export interface Embed {
    title: string;

    url?: string;
    description?: string;
    image?: string;
    customFields?: Record<string, string>;
}

export interface EnableCmd_opts {
    webhook?: boolean;
    bot?: boolean;
}