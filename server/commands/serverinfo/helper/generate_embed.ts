import { RichEmbed } from "discord.js";
import Card from "../../../helper/models/card";

export function generateEmbed(card: Card): RichEmbed {
    const embed: RichEmbed = new RichEmbed()
        .addField("", "");

    return embed;
}
