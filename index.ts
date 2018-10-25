import { DiscordBot } from "./server/discord-bot";
import chalk from "chalk";
import signale from "signale";

// load environmental variables
loadEnvVariables();

const client : DiscordBot = new DiscordBot();
client.start(process.env.API_KEY || "");

function loadEnvVariables(): void {
    signale.start(chalk.green("Loading environmental variables..."));

    try {
        const env : object = require("dotenv-safe").config()
    } catch (error) {
        signale.fatal(error);
    }
}