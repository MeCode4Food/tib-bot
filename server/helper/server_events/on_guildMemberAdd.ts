import { Client, TextChannel, GuildMember } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";
import { aboutUsID, rulesID, announcementsID, tourneyRulesID, welcomeID } from "../server_info/tib";

export function clientOnGuildMemberAdd(client: Client) {
  client.on("guildMemberAdd", (member: GuildMember) => {
    // need to change this event logic to not be so hard coded
    SIGNALE.info(`New User ${chalk.blue(member.displayName)} has joined guild ${member.guild}`);

    if (process.env.ENV_MODE === "PROD") {
        const welcome = member.guild.channels.get(aboutUsID);
        const rules = member.guild.channels.get(rulesID);
        const announcements = member.guild.channels.get(announcementsID);
        const tourneyRules = member.guild.channels.get(tourneyRulesID);

        (member.guild.channels.get(welcomeID) as TextChannel).send(
            `Welcome ${member.user}! Do check out ${welcome} channel for an introduction to the server.\n` +
            `A reminder to follow the ${rules}, and do check out our ${announcements}!\n\n` +
            `If you're here for the tournaments,\n` +
            `Check out ${tourneyRules} or more information on our tourneys!`
        );
      }
  });
}
