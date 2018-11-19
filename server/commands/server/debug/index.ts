import { Message, Emoji } from "discord.js";
import { DiscordBot } from "../../../discord-bot";
import { ICommand, ServerCommand } from "../../_command";

export default class DebugCommand extends ServerCommand {

    constructor() {
        super();
        this.name = "debug"; // command name that comes after the prefix
        this.description = "Describes beta wait"; // description of the example command
        this.hidden = true;
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        const pickEmoji: string = "⛏️";
        const feelsBadManEmoji: Emoji = message.guild.emojis.find((e) => e.name === "FeelsBadMan");

        if (feelsBadManEmoji) {
            const emojiCouplet: string = pickEmoji + feelsBadManEmoji;
            // tslint:disable-next-line:max-line-length
            const messageToSend: string = `${emojiCouplet} HOW ${emojiCouplet} LONG  ${emojiCouplet} CAN ${emojiCouplet} THIS ${emojiCouplet} GO ${emojiCouplet} ON ${emojiCouplet} `;
            message.channel.send(messageToSend);
        }
    }
}
