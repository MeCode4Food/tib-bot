import { Message } from "discord.js";
import { generateGuildEmbed } from "./helper/generate_embed";
import SIGNALE = require("signale");
import { ServerCommand } from "../../_command";
import { DiscordBot } from "../../../discord-bot";

export default class ServerInfoCommand extends ServerCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "serverinfo"; // command name that comes after the prefix
        this.description = "Shows you the server info"; // description of the example command
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
