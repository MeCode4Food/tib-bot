// tslint:disable:object-literal-sort-keys
import { Client, User, GuildMember } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";
import _ from "lodash";
import { axiosPostSecret } from "../../services/axios";

const activityURL = `http://${process.env.DB_API_URL}:${process.env.DB_API_PORT}/user/activity`;

export function clientOnPresenceUpdate(client: Client) {
  client.on("presenceUpdate", (oldUser: GuildMember, newUser: GuildMember) => {
    if (oldUser.presence.status === "offline" && isUserOnline(newUser)) { onUserOnline(newUser); } else
    if (isUserOnline(oldUser) && newUser.presence.status === "offline") { onUserOffline(newUser); }

    if (_.get(oldUser, "presence.game.name") !== "Artifact" && _.get(newUser, "presence.game.name") === "Artifact") { onUserStartGame(newUser); } else
    if (_.get(oldUser, "presence.game.name") === "Artifact" && _.get(newUser, "presence.game.name")  !== "Artifact") { onUserStopGame(oldUser); }
  });
}

function isUserOnline(guildUser: GuildMember) {
  return guildUser.presence.status === "online" || guildUser.presence.status === "idle" || guildUser.presence.status === "dnd";
}

function onUserOnline(guildUser: GuildMember) {
  const activity = "user_online";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(activityURL, userActivity);
}

function onUserOffline(guildUser: GuildMember) {
  const activity = "user_offline";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(activityURL, userActivity);
}

function onUserStartGame(guildUser: GuildMember) {
  const activity = "user_start_game";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(activityURL, userActivity);
}

function onUserStopGame(guildUser: GuildMember) {
  const activity = "user_stop_game";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(activityURL, userActivity);
}

function generateUserActivity(user: User, activity: string) {
  return {
    user_id: user.id,
    date: (new Date()).toISOString(),
    activity,
  };
}
