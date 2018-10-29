import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import Command from "../_command";

export default class EchoCommand extends Command {

    constructor() {
        super();
        this.name = "echo";
        this.description = "echoes the message by the sender";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        const reducer = (accumulator: string, currentValue: string) => accumulator + currentValue;
        const messageContent = args.reduce(reducer);
        message.channel.send(messageContent);
    }
}
