import { Message } from "discord.js";
import { DiscordBot } from "../../../discord-bot";
import { ICommand, ChatCommand } from "../../_command";
import SIGNALE = require("signale");

export default class PingCommand extends ChatCommand {

    constructor() {
        super();
        this.name = "ping";
        this.description = "Returns pong";
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]): void {
        try {
            message.channel.send("Pong!");
        } catch (error) {
            SIGNALE.error(error);
        }
    }
}
