import { Message, Emoji } from "discord.js";
import { DiscordBot } from "../../discord-bot";

export interface ICommand {
    name: string;
    description: string;
    hidden: boolean;
    commandGroup: string;
    commandIconString: string;
    disabled: boolean;

    execute(discordBot: DiscordBot, message: Message, args: string[]): void;
}

/* tslint:disable:max-classes-per-file*/
export class ArtifactCommand implements ICommand {

    public name: string;
    public description: string;
    public hidden: boolean;
    public commandGroup: string;
    public commandIconString: string;
    public disabled: boolean;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "artifact";
        this.commandIconString = "<:artifact:513898212864688128>";
        this.disabled = false;
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
    public commandIconString: string;
    public disabled: boolean;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "chat";
        this.commandIconString = "<:FeelsGoodMan:513896739904946176>";
        this.disabled = false;
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
    public commandIconString: string;
    public disabled: boolean;

    constructor() {
        this.name = "";
        this.description = "";
        this.hidden = false;
        this.commandGroup = "server";
        this.commandIconString = "🌐";
        this.disabled = false;
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pls implement method LEL");
    }
}
