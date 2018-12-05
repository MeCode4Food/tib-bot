import { RichEmbed, Emoji, Client } from "discord.js";
import Card from "../../../helper/models/card";
import { getHexFromDeck } from "./get_hex_from_deck";
import _ from "lodash";
import { Deck } from "../../../helper/models/deck";

export function generateDeckEmbed(client: Client, deck: Deck): RichEmbed {
  console.log(deck);

  // reason why we use client here instead of discordbot ,is so that we can access other emojis that the bot has access to.
  const emojiObject  = generateEmojiObject(client);

  const embed: RichEmbed = new RichEmbed()
              .setAuthor(`${deck.name}`)
              .setColor(getHexFromDeck(deck))
              .addField("Heroes", generateHeroField(deck, emojiObject), false)
  
              .addField("Cards", generateCardsField(deck, emojiObject), true);

  if (deck.items) { embed.addField("Items", generateItemsField(deck, emojiObject), true); }
  return embed;

}

function generateEmojiObject(client: Client): Map<string, Emoji> {
  const artifactRed: Emoji = client.emojis.find((e) => e.name === "artifactred");
  const artifactGreen: Emoji = client.emojis.find((e) => e.name === "artifactgreen");
  const artifactBlue: Emoji = client.emojis.find((e) => e.name === "artifactblue");
  const artifactBlack: Emoji = client.emojis.find((e) => e.name === "artifactblack");

  const emojiObject = new Map<string, Emoji>();

  emojiObject.set("red", artifactRed);
  emojiObject.set("green", artifactGreen);
  emojiObject.set("blue", artifactBlue);
  emojiObject.set("rblacked", artifactBlack);

  return emojiObject;
}

function generateHeroField(deck: Deck, emojiObject: Map<string, Emoji>): string {
  const heroes = deck.heroes;
  let heroOutput = "";

  _.forEach(heroes, (hero) => {
    heroOutput = heroOutput + `Turn ${hero.turn}: ${emojiObject.get(hero.colour)} **${hero.card_name}**\n`;
  });
  return heroOutput;
}

function generateCardsField(deck: Deck, emojiObject: Map<string, Emoji>): string[] {
  const cards = deck.cards;
  const limit = 1024;

  let currentText = "";
  const cardsOutput: string[] = [];

  // Iron Fog Goldmine ×1
  // Assassinate ×3
  // Track ×3

  _.forEach(cards, (card) => {
    const lengthBefore = currentText.length;

    const textToAdd = `${card.count}× ${emojiObject.get(card.colour)} **${card.mana_cost}** ${card.card_name}\n`;
    if(lengthBefore + textToAdd.length > limit) {
      cardsOutput.push(currentText);
      currentText = textToAdd;
    } else {
      currentText += textToAdd;
    }
  });
  console.log(cardsOutput.length);
  return cardsOutput;
}

function generateItemsField(deck: Deck, emojiObject: Map<string, Emoji>): string {
  const items = deck.items;
  let itemsOutput = "";

  // Iron Fog Goldmine ×1
  // Assassinate ×3
  // Track ×3

  _.forEach(items, (item) => {
    itemsOutput = itemsOutput + `${item.count}× ${emojiObject.get(item.colour)} ${item.card_name}\n`;
  });
  return itemsOutput;
}
