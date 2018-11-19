import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";

export interface ICommand {
    name: string;
    description: string;
    hidden: boolean;
    commandGroup: string;

    execute(discordBot: DiscordBot, message: Message, args: string[]): void;
}

/* tslint:disable:max-classes-per-file*/
export class ArtifactCommand implements ICommand {

    public name: string;
    public description: string;
    public hidden: boolean;
    public commandGroup: string;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "artifact";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pls implement method LEL");
    }
}

export class ChatCommand implements ICommand {

    public name: string;
    public description: string;
    public hidden: boolean;
    public commandGroup: string;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "chat";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pls implement method LEL");
    }
}

export class ServerCommand implements ICommand {

    public name: string;
    public description: string;
    public hidden: boolean;
    public commandGroup: string;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "server";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pls implement method LEL");
    }
}
