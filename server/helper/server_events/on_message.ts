import { Client, Message, TextChannel } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";

export function clientOnMessage(client: Client, parseMessageHandleCommands: (message: Message) => void) {
  client.on("message", (message: Message) => {
    // Log messages
    console.log(chalk.green(message.author.username) + ":"
    + chalk.cyan((message.channel as TextChannel).name) + ">" + chalk.blue(message.toString()));

    parseMessageHandleCommands(message);

  });
}
