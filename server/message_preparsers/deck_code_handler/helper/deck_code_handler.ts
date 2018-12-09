import { axiosGet } from "../../../services/axios";
import { getDBUrl } from "./get_db_url";

export default class DeckCodeHandler {
  /* tslint:disable:member-ordering */
  /* tslint:disable:no-bitwise */

  // verifies checksum for deck code. takes in deck code with or without prefix
  public static verifyCheckSum(deckCodeWithPrefix: string) {
    const currentVersion = 2;
    console.log(process.env.DECK_CODE_PREFIX);
    const deckCode = deckCodeWithPrefix.startsWith(process.env.DECK_CODE_PREFIX!) ? this.trimAndFixDeckCode(deckCodeWithPrefix) : deckCodeWithPrefix;
    console.log(deckCode);
    const deckByteArray: number[] = [];

    // Bufferize deckCode to convert to array
    const decoded = Buffer.from(deckCode, "base64").toString("binary");

    for (let i = 0; i < decoded.length; i++) {
      deckByteArray.push(decoded.charCodeAt(i));
    }

    console.log(JSON.stringify(deckByteArray));
    console.log(JSON.stringify(Buffer.from(deckCode, "base64").toString("binary")));

    const currentByteIndex = [0];
    const deckByteArrayLength = deckByteArray.length;
    // check version num
    const versionAndHeroes = deckByteArray[currentByteIndex[0]++];
    const version = versionAndHeroes >> 4;
    const checkSum = deckByteArray[1];

    if (currentVersion !== version && version !== 1) { return false; }

    // do checksum check
    const $nChecksum = deckByteArray[currentByteIndex[0]++];
    let stringLength = 0;
    if (version > 1) { stringLength = deckByteArray[currentByteIndex[0]++]; }
    const totalCardBytes = deckByteArrayLength - stringLength;
    // grab the string size
    // {
    let calcCheckSum = 0;
    for (let i = currentByteIndex[0]; i < totalCardBytes; i++) { calcCheckSum += deckByteArray[i]; }
    calcCheckSum = (calcCheckSum & 0xFF);
    console.log(calcCheckSum);
    // comapre checksums
    return checkSum === calcCheckSum ? true : false;
  }

  public static trimAndFixDeckCode(deckCodeWithPrefix: string): string { return deckCodeWithPrefix.replace(/-/g, "/").replace(/_/g, "=").slice(3); }

  public static async requestDeckObject(deckCodeWithPrefix: string) {
    const dbUrl = getDBUrl(deckCodeWithPrefix);
    const result = await axiosGet(dbUrl);

    return result;
  }
}
