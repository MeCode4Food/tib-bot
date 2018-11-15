import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";

export default class Command {
    public name: string;
    public description: string;

    constructor() {
        this.name = "";
        this.description = "";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pls implement method LEL");
    }

    public debug(): void {
        console.log("inside here!");
    }
}
