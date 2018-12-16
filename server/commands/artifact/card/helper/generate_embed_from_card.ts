import { RichEmbed } from "discord.js";
import { getHexFromColour } from "./get_hex_from_colour";
import Card from "../../../../helper/models/card";

export function generateEmbedFromCard(card: Card): RichEmbed {
    const embed: RichEmbed = new RichEmbed()
                .setColor(card.card_type === "Item" ? getHexFromColour("yellow") : getHexFromColour(card.colour))
                .addField("Card Name", card.card_name, true)
                .addField("Card Type", card.card_type, true);

    if (card.rarity) { embed.addField("Rarity", card.rarity); }
    if (card.attack || card.armour || card.hit_points ) {
        embed.addField("Stats", `${card.attack || 0 }/${card.armour || 0}/${card.hit_points || 0}`, true);
    }
    // if (card.attack) { embed.addField("Attack", card.attack, true); }
    // if (card.armour) { embed.addField("Armor", card.armour, true); }
    // if (card.hit_points) { embed.addField("Health", card.hit_points, true); }
    if (card.mana_cost) { embed.addField("Mana Cost", card.mana_cost, true); }
    if (card.card_text && card.card_type !== "Hero") { embed.addField("Card Text", card.card_text); }
    if (card.signature_name) { embed.addField("Signature Card", card.signature_name); }
    if (card.passive_name) { embed.addField("Passive Ability", `**${card.active_name}**: ${card.active_text}`); }
    if (card.active_name && card.card_type === "Hero") { embed.addField("Active Ability", `**${card.passive_name}**: ${card.passive_text}`); }
    if (card.parent_type === "Hero") {
        if (card.card_type === "Ability") {
            embed.addField("Active Ability for ", `${card.parent_name}`, true);
        } else {
            embed.addField("Signature Card for ", `${card.parent_name}`, true);
        }
    }
    if (card.card_image) { embed.setThumbnail(card.card_image); }

    return embed;
}
