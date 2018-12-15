import { Client } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";

export function clientOnError(client: Client, startFunction: (token: string ) => void, token: string) {
  client.on("error", (error) => {
    console.error("error message:");
    SIGNALE.error(error.message);
    console.error("error object:");
    console.error(error);

    if (error.message === "read ECONNRESET") {
        startFunction(token);
    } else {
        SIGNALE.info(`${chalk.red("ERROR MESSAGE")}: ${error.message}`);
    }
  });
}
