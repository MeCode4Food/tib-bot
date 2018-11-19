import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import { ArtifactCommand } from "../_command";

export default class ExampleCommand extends ArtifactCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "example"; // command name that comes after the prefix
        this.description = "does something"; // description of the example command
        this.hidden = false;
        this.commandGroup = "";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        try {
            message.channel.send("Example command executed!"); // replace this with something you want to do
        } catch (error) {
            throw error;
        }
    }
}
