import { Message } from "discord.js";
import Command from "../_command";
import { DiscordBot } from "../../discord-bot";

export default class PingCommand extends Command {

    constructor() {
        super();
        this.name = "ping";
        this.description = "returns pong";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Pong!");
    }
}