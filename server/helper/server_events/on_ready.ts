import { Client } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";

export function clientOnReady(client: Client): void {
  client.on("ready", () => {
    SIGNALE.success(chalk.green("Logged in!"));
    client.user.setActivity("Artifact");
  });
}
