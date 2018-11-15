import { Message, Emoji } from "discord.js";
import Command from "../_command";
import { DiscordBot } from "../../discord-bot";

export default class WhyCommand extends Command {

    constructor() {
        super();
        this.name = "why";
        this.description = "explains why we don't use Discord Commando Client";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        const reeEmoji: Emoji = message.guild.emojis.find((e) => e.name === "REEE");

        message.channel.send(`Stay away from Discord Commando ${reeEmoji ? reeEmoji.toString() +
             reeEmoji.toString() + reeEmoji.toString() : "REEE"}`);
    }
}
