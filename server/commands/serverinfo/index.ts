import { Message } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import Command from "../_command";
import { generateGuildEmbed } from "./helper/generate_embed";
import SIGNALE = require("signale");

export default class ServerInfoCommand extends Command {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "serverinfo"; // command name that comes after the prefix
        this.description = "Shows you server info"; // description of the example command
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        try {
            const embed = generateGuildEmbed(message.guild);
            // console.log("ID", (discordBot as any).client.guilds);
            message.channel.send(embed); // replace this with something you want to do
        } catch (error) {
            SIGNALE.error(error);
        }
    }
}
