import Discord, { TextChannel } from "discord.js";
import { Message } from "discord.js";
import Command from "./commands/_command";
import chalk from "chalk";
import signale from "signale";
import * as _ from "lodash";
import fs from "fs";

export class DiscordBot {
    private client = new Discord.Client();
    private commands = new Discord.Collection();
    private commandList = [];
    private readonly prefix = process.env.COMMAND_PREFIX;

    constructor() {
        try {
            console.log(process.env.COMMAND_PREFIX);
            this.initListeners();
            this.initENV();
            this.initCommands();
        } catch (error) {
            signale.error(error);
        }
    }

    private initListeners(): void {
        this.client.on("ready", () => {
            signale.success(chalk.green("Logged in!"));
            this.client.user.setActivity("Artifact Waiting Room");
        });

        this.client.on("message", (message: Message) => {
            console.log(chalk.green(message.author.username) + ":"
             + chalk.cyan((message.channel as TextChannel).name) + ">" + chalk.blue(message.toString()));

            // command and args are based in !<command> <args[0]> <args[1]>  <args[2]> ...
            if(message.content.startsWith(this.prefix!)) {

                const args : string[] = message.content.slice(this.prefix!.length).split(/ +/);
                const commandName : string = args.shift()!.toLowerCase().replace(this.prefix!, "");

                if(commandName === "debug") {
                    console.log("list");
                    // console.log(message.guild.emojis);
                }

                // check if collects has the command, if yes, execute it
                if(this.commands.has(commandName)) {
                    try {
                        // ignore errors here by using cast 'as any'.
                        (this.commands.get(commandName)! as any).execute(this as DiscordBot, message, args);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });

        this.client.on("error", (error) => {
            throw error;
        });
    }

    public start(token: string): void {
        this.client.login(token);
    }

    // doesn't really initialize environmental variables
    private initENV(): void {
        if(_.isEmpty(this.prefix)) {
            throw new Error(`Please make sure .env is complete Prefix: ${this.prefix}`);
        }
    }

    private initCommands(): void {

        // read all folders inside ./server/commands
        const commandFiles : string[] = fs.readdirSync("./server/commands");

        // loop through all of them and add them to this.commands as part of a collection
        for (let file of commandFiles) {
            if(!file.startsWith("_")) {
                const commandClass : any = require(`./commands/${file}`).default;
                const command : any = new commandClass();
                this.commands.set(command.name, command);
            }
        }
        console.log("commands", this.commands.entries());
    }
}