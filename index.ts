import { DiscordBot } from "./server/discord-bot";
import chalk from "chalk";
import signale from "signale";

// load environmental variables
loadEnvVariables();

const discordBot: DiscordBot = new DiscordBot();
discordBot.start(process.env.DISCORD_TOKEN || "");

function loadEnvVariables(): void {
    signale.start(chalk.green("Loading environmental variables..."));

    try {
        const env: object = require("dotenv-safe").config();
    } catch (error) {
        signale.fatal(error);
    }
}
