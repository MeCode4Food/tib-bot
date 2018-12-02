import { Message } from "discord.js";
import DeckCodeHandler from "./helper/deck_code_handler";
import { generateDeckEmbed } from "./helper/generate_deck_embed";

export async function handleDeckCodeMessage(message: Message) {
  const unparsedDeckCode = message.content;
  try {
    if (DeckCodeHandler.verifyCheckSum(unparsedDeckCode)) {
      const deckObject = (await DeckCodeHandler.requestDeckObject(unparsedDeckCode)).data.data;
      const embed = generateDeckEmbed(deckObject);

      message.channel.send(embed);
    }
  } catch (error) {
    throw error;
  }
}
