import { Message } from "discord.js";
import { ServerCommand } from "../../_command";
import { DiscordBot } from "../../../discord-bot";
import { generateHelpEmbed } from "./helper/generate_help_embed";

export default class HelpCommand extends ServerCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "help"; // command name that comes after the prefix
        this.description = "Shows you what commands are available"; // description of the example command
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        // tslint:disable
        // TODO loop through entries and create embed
        const embed = generateHelpEmbed(discordBot);
        
        console.log((discordBot as any).commands.entries());
        message.channel.send(embed); // replace this with something you want to do
    }
}
