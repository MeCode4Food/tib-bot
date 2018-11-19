import { Message } from "discord.js";
import { ChatCommand } from "../../_command";
import { DiscordBot } from "../../../discord-bot";

export default class EchoCommand extends ChatCommand {

    constructor() {
        super();
        this.name = "echo";
        this.description = `Echoes the message by the sender *e.g. ${process.env.COMMAND_PREFIX}${this.name} I love you!* `;
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        const reducer = (accumulator: string, currentValue: string) => accumulator + " " + currentValue;
        const messageContent = args.reduce(reducer);
        message.channel.send(messageContent);
    }
}
