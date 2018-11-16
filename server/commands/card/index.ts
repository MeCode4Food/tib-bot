import { Message, RichEmbed } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import { getDBUrl, generateEmbedFromCard, getCardfromUrl } from "./helper";
import Command from "../_command";
import _ from "lodash";

export default class CardCommand extends Command {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "card"; // command name that comes after the prefix
        this.description = "search for cards"; // description of the example command
    }

    public async execute(discordBot: DiscordBot, message: Message, args: string[]): Promise<void> {
        const cardQuery = args.join(" ");

        // construct db url from card query
        const dbUrl = getDBUrl(cardQuery);

        // obtain results from db
        const response: any = getCardfromUrl(dbUrl);

        // if response is empty, return error
        if (_.isEmpty(response)) {
            message.channel.send(`Card '${cardQuery}' not found`);
        } else {

            // using the card response, generate the embed
            const embed = generateEmbedFromCard(response);

            message.channel.send(embed);
        }
    }
}
