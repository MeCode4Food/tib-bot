import { Client, User } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";

export function clientOnPresenceUpdate(client: Client) {
  client.on("presenceUpdate", (oldUser: User, newUser: User) => {
    if (oldUser.presence.status === "offline" && isUserOnline(newUser)) { onUserOnline(newUser); } else
    if (isUserOnline(oldUser) && newUser.presence.status === "offline") { onUserOffline(newUser); }

    if (oldUser.presence.game.name !== "Artifact" && newUser.presence.game.name === "Artifact") { onUserStartGame(newUser); } else
    if (oldUser.presence.game.name === "Artifact" && newUser.presence.game.name !== "Artifact") { onUserStopGame(newUser); }
  });
}

function isUserOnline(user: User) {
  return user.presence.status === "online" || user.presence.status === "idle" || user.presence.status === "dnd";
}

function onUserOnline(user: User) {
  SIGNALE.info(`User ${chalk.cyan(user.username)} has come online`);
}

function onUserOffline(user: User) {
  SIGNALE.info(`User ${chalk.cyan(user.username)} has went offline`);
}

function onUserStartGame(user: User) {
  SIGNALE.info(`User ${chalk.cyan(user.username)} has started game ${user.presence.game.name}`);
}

function onUserStopGame(user: User) {
  SIGNALE.info(`User ${chalk.cyan(user.username)} has stopped game ${user.presence.game.name}`);
}
