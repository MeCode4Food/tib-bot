import { RichEmbed } from "discord.js";
import Card from "../../../helper/models/card";
import { getHexFromDeck } from "./get_hex_from_deck";
import _ from "lodash";

export function generateDeckEmbed(deck: any): RichEmbed {

  console.log(deck);

  const embed: RichEmbed = new RichEmbed()
              .setAuthor(`${deck.name}`)
              .setColor(getHexFromDeck(deck))
              .addField("Heroes", generateHeroField(deck), false)
              .addField("Cards", generateCardsField(deck), true);

  if (deck.items) { embed.addField("Items", generateItemsField(deck), true); }
  return embed;

}

function generateHeroField(deck: any): string {
  const heroes = deck.heroes;
  let heroOutput = "";

  // Turn 1: Zeus
  // Turn 2: Axe
  // Turn 3: Rubick
  // Turn 4: Sand King
  // Turn 5: Pugna

  _.forEach(heroes, (hero) => {
    heroOutput = heroOutput + `Turn ${hero.turn}: **${hero.card_name}**\n`;
  });
  return heroOutput;
}

function generateCardsField(deck: any): string {
  const cards = deck.cards;
  let cardsOutput = "";

  // Iron Fog Goldmine ×1
  // Assassinate ×3
  // Track ×3

  _.forEach(cards, (card) => {
    cardsOutput = cardsOutput + `${card.card_name} ×${card.count}\n`;
  });
  return cardsOutput;
}

function generateItemsField(deck: any): string {
  const items = deck.items;
  let itemsOutput = "";

  // Iron Fog Goldmine ×1
  // Assassinate ×3
  // Track ×3

  _.forEach(items, (item) => {
    itemsOutput = itemsOutput + `${item.card_name} ×${item.count}\n`;
  });
  return itemsOutput;
}
