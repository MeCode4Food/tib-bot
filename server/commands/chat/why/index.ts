import { Message, Emoji } from "discord.js";
import { DiscordBot } from "../../../discord-bot";
import { ICommand, ChatCommand } from "../../_command";

export default class WhyCommand extends ChatCommand {

    constructor() {
        super();
        this.name = "why";
        this.description = "Explains why we don't use Discord Commando Client";
        this.hidden = true;
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        const reeEmoji: Emoji = message.guild.emojis.find((e) => e.name === "REEE");

        message.channel.send(`Stay away from Discord Commando ${reeEmoji ? reeEmoji.toString() +
             reeEmoji.toString() + reeEmoji.toString() : "REEE"}`);
    }
}
