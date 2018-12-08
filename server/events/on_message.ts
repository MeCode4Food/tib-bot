import { DiscordBot } from "../discord-bot";
import SIGNALE from "signale";
import chalk from "chalk";
import { Message, TextChannel } from "discord.js";

export function handleOnMessage(this: DiscordBot, message: Message) {
    // Log messages
    console.log(chalk.green(message.author.username) + ":"
    + chalk.cyan((message.channel as TextChannel).name) + ">" + chalk.blue(message.toString()));

    this.parseMessageHandleCommands(message);
}
