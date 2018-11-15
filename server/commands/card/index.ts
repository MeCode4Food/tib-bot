import { Message, RichEmbed } from "discord.js";
import { DiscordBot } from "../../discord-bot";
import Command from "../_command";
import axios from "axios";

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
        let dbUrl = "http://";
        dbUrl += process.env.DB_API_URL ? process.env.DB_API_URL : "127.0.0.1";
        dbUrl += `:${process.env.DB_API_PORT}/card?query=${cardQuery}`;

        const response: any = (await axios.get(dbUrl)).data.data;

        if (response.length === 0) {
            message.channel.send(`Card '${cardQuery}' not found`);
        } else {
            const embed: RichEmbed = new RichEmbed()
                .setColor(4868682)
                .addField("Card Name", response.card_name, true)
                .addField("Card Type", response.card_type, true);

            if (response.rarity) { embed.addField("Rarity", response.rarity); }
            if (response.attack) { embed.addField("Attack", response.attack, true); }
            if (response.armour) { embed.addField("Armor", response.armour, true); }
            if (response.hit_points) { embed.addField("Hit Points", response.hit_points, true); }
            if (response.mana_cost) { embed.addField("Mana Cost", response.mana_cost, true); }
            if (response.card_text) { embed.addField("Card Text", response.card_text); }
            if (response.signature_name) { embed.addField("Signature Card", response.signature_name); }
            if (response.passive_name) { embed.addField("Passive Ability", `${response.passive_name} ${response.passive_text}`); }
            if (response.parent_type === "Hero") { embed.addField("Signature Card for ", `${response.parent_name}`, true); }
            if (response.card_image) { embed.setThumbnail(response.card_image); }

            console.log(response);
            message.channel.send(embed);
        }
    }
}
