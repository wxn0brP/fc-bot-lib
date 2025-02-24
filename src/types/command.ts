import Mess from "../mess";

export interface Command {
    name: string;
    alias: string[];
    minArgs: number;
    usage: string;
    execute: (mess: Mess, args: string[]) => Promise<string>;
}