import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import Command from "../_command";

export default class HelpCommand extends Command {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "help"; // command name that comes after the prefix
        this.description = "Shows you what commands are available"; // description of the example command
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        message.channel.send("Example command executed!"); // replace this with something you want to do
    }
}
