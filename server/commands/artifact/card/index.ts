import { Message } from "discord.js";
import { DiscordBot } from "../../../discord-bot";
import { pingCardRepo } from "./helper/ping_card_repo";
import { ICommand, ArtifactCommand } from "../../_command";
import { getCardfromUrl } from "./helper/get_card_from_url";
import { generateEmbedFromCard } from "./helper/generate_embed_from_card";
import { getDBUrl } from "./helper/get_db_url";
import Card from "../../../helper/models/card";
import _ from "lodash";

export default class CardCommand extends ArtifactCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "card"; // command name that comes after the prefix
        this.description = `Search for cards *e.g. ${process.env.COMMAND_PREFIX}${this.name} Axe*`; // description of the example command
    }

    public async execute(discordBot: DiscordBot, message: Message, args: string[]): Promise<void> {
        const cardQuery = args.join(" ");
        try {
            if (cardQuery === "") {
                message.channel.send(`Please enter a valid input. e.g. ${process.env.COMMAND_PREFIX}${this.name} Axe`);
                return;
            }

            // construct db url from card query
            const dbUrl = getDBUrl(cardQuery);

            // obtain results from db
            const cardResult: Card | null = await getCardfromUrl(dbUrl);

            // if response is empty, return error
            if (cardResult === null) { message.channel.send(`No results found for card '${cardQuery}'`); } else {
                // using the card response, generate the embed
                const embed = generateEmbedFromCard(cardResult);

                message.channel.send(embed);
            }
        } catch (error) {
            message.channel.send(`Error getting card '${cardQuery}'`);
            throw error;
        }
    }
}
