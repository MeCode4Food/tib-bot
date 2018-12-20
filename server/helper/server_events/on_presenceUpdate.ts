// tslint:disable:object-literal-sort-keys
import { Client, User, GuildMember } from "discord.js";
import chalk from "chalk";
import SIGNALE from "signale";
import _ from "lodash";
import { axiosPostSecret } from "../../services/axios";

export function clientOnPresenceUpdate(client: Client) {
  client.on("presenceUpdate", (oldUser: GuildMember, newUser: GuildMember) => {
    if (process.env.ENV_MODE === "PROD") {
      if (oldUser.presence.status === "offline" && isUserOnline(newUser)) { onUserOnline(newUser); } else
      if (isUserOnline(oldUser) && newUser.presence.status === "offline") { onUserOffline(newUser); }

      if (_.get(oldUser, "presence.game.name") !== "Artifact" && _.get(newUser, "presence.game.name") === "Artifact") { onUserStartGame(newUser); } else
      if (_.get(oldUser, "presence.game.name") === "Artifact" && _.get(newUser, "presence.game.name")  !== "Artifact") { onUserStopGame(oldUser); }
    }
  });
}

function isUserOnline(guildUser: GuildMember) {
  return guildUser.presence.status === "online" || guildUser.presence.status === "idle" || guildUser.presence.status === "dnd";
}

function onUserOnline(guildUser: GuildMember) {
  const activity = "user_online";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(getActivityURL(), userActivity);
}

function onUserOffline(guildUser: GuildMember) {
  const activity = "user_offline";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(getActivityURL(), userActivity);
}

function onUserStartGame(guildUser: GuildMember) {
  const activity = "user_start_game";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(getActivityURL(), userActivity);
}

function onUserStopGame(guildUser: GuildMember) {
  const activity = "user_stop_game";
  const userActivity = generateUserActivity(guildUser.user, activity);

  axiosPostSecret(getActivityURL(), userActivity);
}

function generateUserActivity(user: User, activity: string) {
  return {
    user_id: user.id,
    date: (new Date()).toISOString(),
    activity,
  };
}

// made this into function to prevent assignment of string to be called before env files are initialized
const getActivityURL = () => `http://${process.env.DB_API_URL}:${process.env.DB_API_PORT}/user/activity`;
