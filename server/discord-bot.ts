import Discord from "discord.js";
import { Message } from "discord.js";
import { ICommand } from "./commands/_command";
import { handleDeckCodeMessage } from "./message_preparsers/deck_code_handler";
import { isDeckCodeInMessage } from "./message_preparsers/deck_code_handler/helper/is_deck_code_in_message";
import { TIBID } from "./helper/server_info/tib";
import { clientOnReady } from "./helper/server_events/on_ready";
import { clientOnGuildMemberAdd } from "./helper/server_events/on_guildMemberAdd";
import { clientOnMessage } from "./helper/server_events/on_message";
import { clientOnError } from "./helper/server_events/on_error";
import { clientOnPresenceUpdate } from "./helper/server_events/on_presenceUpdate";
import SIGNALE from "signale";
import * as _ from "lodash";
import fs from "fs";

export class DiscordBot {
    private client = new Discord.Client();
    private commands = new Discord.Collection();
    private token = "";
    private readonly prefix = process.env.COMMAND_PREFIX;

    constructor() {
        try {
            this.initENV();
            this.initListeners();
            this.initCommands();
            this.initTimedScripts();
        } catch (error) {
            SIGNALE.error(error);
            throw error;
        }
    }

    public start(token: string): void {
        this.token = token;
        this.client.login(token)
            .catch((error) => {
                SIGNALE.error("Client start error");
                SIGNALE.error(error);
                this.start(this.token);
            });
    }

    private initENV(): void {
        if (_.isEmpty(this.prefix)) {
            throw new Error(`Please make sure .env is complete Prefix: ${this.prefix}`);
        }

        if (process.env.ENV_MODE === "DEV") {
            process.env.DB_API_URL = process.env.DEV_DB_API_URL;
            process.env.DB_API_PORT = process.env.DEV_DB_API_PORT;
        } else if (process.env.ENV_MODE === "PROD") {
            process.env.DB_API_URL = process.env.PROD_DB_API_URL;
            process.env.DB_API_PORT = process.env.PROD_DB_API_PORT;
        } else {
            throw new Error(`Please check your ENV_MODE`);
        }
    }

    private initListeners(): void {
        clientOnReady(this.client);
        clientOnGuildMemberAdd(this.client);
        clientOnMessage(this.client, this.parseMessageHandleCommands.bind(this));
        clientOnPresenceUpdate(this.client);

        clientOnError(this.client, this.start, this.token);
    }

    private initCommands(): void {
        // read all folders inside ./server/commands
        const directory = "./server/commands";

        this.loadCommandsFromDirectory(directory);
    }

    private initTimedScripts(): any {
        // setInterval(() => {
        //     console.log(
        //         `Count: ${this.client.guilds.get(TIBID)!.memberCount} ` +
        //         `Online: ${this.client.guilds.get(TIBID)!.members.filter((m) => m.presence.status === "online").size} ` +
        //         `In Game: ${this.client.guilds.get(TIBID)!.members.filter((m) => (m.presence.game || {}).name === "Artifact").size}`
        //     );
        // }, 5000);
    }

    private loadCommandsFromDirectory(directory: string) {
        const commandTypes: string[] = fs.readdirSync(directory);

        // loop through all of them and add them to this.commands as part of a collection
        for (const type of commandTypes) {
            if (!type.startsWith("_")) {
                const commandList: string[] = fs.readdirSync(`${directory}/${type}`);
                for (const file of commandList) {
                    const commandClass: any = require(`./commands/${type}/${file}`).default;
                    const command: ICommand = new commandClass();

                    /*ts-lint:disable */
                    if (!command.disabled) { this.commands.set(command.name, command); }
                }
            }
        }
        // console.log("commands", this.commands.entries());
    }

    private parseMessageHandleCommands(message: Message) {

        // check if message is a bot command
        if (message.content.startsWith(this.prefix!)) {

            const args: string[] = message.content.slice(this.prefix!.length).split(/ +/);
            const commandName: string = args.shift()!.toLowerCase().replace(this.prefix!, "");

            if (commandName === "debug") {
                console.log("list");
                // console.log(message.guild.emojis);
            }

            // check if collects has the command, if yes, execute it
            if (this.commands.has(commandName)) {
                try {
                    // ignore errors here by using cast 'as any'.
                    (this.commands.get(commandName)! as any).execute(this as DiscordBot, message, args);
                } catch (error) {
                    SIGNALE.error(error);
                }
            }
        } else if (isDeckCodeInMessage(message) && process.env.ENV_MODE === "PROD") {
            // decode deck code
            handleDeckCodeMessage(this.client, message);
        }
    }
}
