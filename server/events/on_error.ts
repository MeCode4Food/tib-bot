import { DiscordBot } from "../discord-bot";
import SIGNALE from "signale";
import chalk from "chalk";

export function handleOnError(error: Error, discordBot: DiscordBot, token: string){
    console.error("error message:");
    SIGNALE.error(error.message);
    console.error("error object:");
    console.error(error);

    if (error.message === "read ECONNRESET") {
        discordBot.start(token);
    } else {
        SIGNALE.info(`${chalk.red("ERROR MESSAGE")}: ${error.message}`);
    }

}