import { Message } from "discord.js";
import DeckCodeHandler from "./helper/deck_coder_handler";

export function handleDeckCodeMessage(message: Message) {
  const unparsedDeckCode = message.content;

  if (DeckCodeHandler.verifyCheckSum(unparsedDeckCode)) {
    const result = DeckCodeHandler.requestDeckObject(unparsedDeckCode);
    message.channel.send(result);
  }
}
