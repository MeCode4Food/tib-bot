import { Message } from "discord.js";
import DeckCodeHandler from "./helper/deck_code_handler";
import { generateDeckEmbed } from "./helper/generate_deck_embed";
import { isDeckCodeInMessage } from "./helper/is_deck_code_in_message";

export async function handleDeckCodeMessage(message: Message) {
  const unparsedDeckCode = isDeckCodeInMessage(message);

  try {
    if (unparsedDeckCode && DeckCodeHandler.verifyCheckSum(unparsedDeckCode as string)) {
      const deckObject = (await DeckCodeHandler.requestDeckObject(unparsedDeckCode as string)).data.data;
      const embed = generateDeckEmbed(deckObject);

      message.channel.send(embed);
    }
  } catch (error) {
    throw error;
  }
}
