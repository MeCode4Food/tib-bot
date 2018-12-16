import { Client, User, GuildMember } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";
import _ from "lodash";

export function clientOnPresenceUpdate(client: Client) {
  client.on("presenceUpdate", (oldUser: GuildMember, newUser: GuildMember) => {
    if (oldUser.presence.status === "offline" && isUserOnline(newUser)) { onUserOnline(newUser); } else
    if (isUserOnline(oldUser) && newUser.presence.status === "offline") { onUserOffline(newUser); }

    if (_.get(oldUser, "presence.game.name") !== "Artifact" && _.get(newUser, "presence.game.name") === "Artifact") { onUserStartGame(newUser); } else
    if (_.get(oldUser, "presence.game.name") === "Artifact" && _.get(newUser, "presence.game.name")  !== "Artifact") { onUserStopGame(newUser); }
  });
}

function isUserOnline(guildUser: GuildMember) {
  return guildUser.presence.status === "online" || guildUser.presence.status === "idle" || guildUser.presence.status === "dnd";
}

function onUserOnline(guildUser: GuildMember) {
  SIGNALE.info(`User ${chalk.cyan(guildUser.user.username)} has come online`);
}

function onUserOffline(guildUser: GuildMember) {
  SIGNALE.info(`User ${chalk.cyan(guildUser.user.username)} has went offline`);
}

function onUserStartGame(guildUser: GuildMember) {
  SIGNALE.info(`User ${chalk.cyan(guildUser.user.username)} has started game ${guildUser.presence.game.name}`);
}

function onUserStopGame(guildUser: GuildMember) {
  SIGNALE.info(`User ${chalk.cyan(guildUser.user.username)} has stopped game ${guildUser.presence.game.name}`);
}
