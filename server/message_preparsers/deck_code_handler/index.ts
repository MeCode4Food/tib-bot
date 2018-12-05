import { Message, Client } from "discord.js";
import DeckCodeHandler from "./helper/deck_code_handler";
import { generateDeckEmbed } from "./helper/generate_deck_embed";
import { isDeckCodeInMessage } from "./helper/is_deck_code_in_message";

export async function handleDeckCodeMessage(client: Client, message: Message) {
  const unparsedDeckCode = isDeckCodeInMessage(message);

  try {
    if (unparsedDeckCode && DeckCodeHandler.verifyCheckSum(unparsedDeckCode as string)) {
      const deckObject = (await DeckCodeHandler.requestDeckObject(unparsedDeckCode as string)).data.data;
      const embed = generateDeckEmbed(client, deckObject);

      message.channel.send(embed);
    }
  } catch (error) {
    throw error;
  }
}
