import { Message } from "discord.js";
import _ from "lodash";
const deckCodePrefix = "ADC";
const artifactDeckURL = "https://www.playartifact.com/d/";

export function isDeckCodeInMessage(message: Message): boolean | string {
  const words = convertMessageContentToArray(message);
  let val: string | boolean = false;

  _.forEach(words, (word) => {
    if (word.startsWith(deckCodePrefix)) { val = word; }
    if (word.startsWith(artifactDeckURL)) { val = word.replace(artifactDeckURL, ""); }
  });
  return val;
}

function convertMessageContentToArray(message: Message): string[] {

  const args: string[] = message.content.split(/ +/);
  return args;
}
