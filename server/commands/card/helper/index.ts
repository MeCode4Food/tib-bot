import { RichEmbed } from "discord.js";
import axios from "axios";
import Card from "../../../helper/models/card";

export async function getCardfromUrl(dbUrl: string): Promise<Card> {
  try {
    const response: any = (await axios.get(dbUrl)).data.data;
    const card: Card = new Card(response);
    return card;
  } catch (error) {
    throw error;
  }
}

export function getDBUrl(cardQuery: string): string {
  let dbUrl = "http://";
  dbUrl += process.env.DB_API_URL ? process.env.DB_API_URL : "127.0.0.1";
  dbUrl += `:${process.env.DB_API_PORT}/card?query=${cardQuery}`;

  return dbUrl;
}

export function generateEmbedFromCard(card: any): RichEmbed {
  const embed: RichEmbed = new RichEmbed()
                .setColor(4868682)
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
  if (card.passive_name) { embed.addField("Passive Ability", `**${card.passive_name}**: ${card.passive_text}`); }
  if (card.parent_type === "Hero") { embed.addField("Signature Card for ", `${card.parent_name}`, true); }
  if (card.card_image) { embed.setThumbnail(card.card_image); }

  return embed;
}
