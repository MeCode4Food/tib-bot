// tslint:disable:object-literal-sort-keys
import { Client } from "discord.js";
import { CronJob } from "cron";
import { hourlyActvitiyCronString, TIBID } from "../server_info/variables";
import { axiosPostSecret } from "../../services/axios";

export function recordHourlyActivity(client: Client) {
  const a = new CronJob(hourlyActvitiyCronString, () => {
    console.log(`cron job at ${new Date()}`);
    axiosPostSecret(getHourlyActivityURL(), generateHourlyActivity(client));
  });

  a.start();
}

function generateHourlyActivity(client: Client) {
  const now = new Date();
  const todayDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const thisHour = now.getHours();

  const usersOnline = client.guilds.get(TIBID)!.members.filter((m) => m.presence.status === "online").size;
  const inGame = client.guilds.get(TIBID)!.members.filter((m) => (m.presence.game || {}).name === "Artifact").size;
  const totalUsers = client.guilds.get(TIBID)!.memberCount;

  return {
    timestamp: now,
    online: usersOnline,
    in_game: inGame,
    total: totalUsers
  };
}

// made this into function to prevent assignment of string to be called before env files are initialized
const getHourlyActivityURL = () => `http://${process.env.DB_API_URL}:${process.env.DB_API_PORT}/user/hourlyActivity`;
