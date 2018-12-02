import { axiosGet } from "../../../services/axios";
import { getDBUrl } from "./get_db_url";

export default class DeckCodeHandler {
  /* tslint:disable:member-ordering */
  /* tslint:disable:no-bitwise */

  // verifies checksum for deck code. takes in deck code with or without prefix
  public static verifyCheckSum(deckCodeWithPrefix: string) {
    const deckCode = deckCodeWithPrefix.startsWith(process.env.DECK_CODE_PREFIX!) ? this.trimAndFixDeckCode(deckCodeWithPrefix) : deckCodeWithPrefix;

    const deckByteArray: number[] = [];

    // Bufferize deckCode to convert to array
    Buffer.from(deckCode, "base64").map((e) => deckByteArray.push(e));

    const version = deckByteArray[0] >> 4;
    const checkSum = deckByteArray[1];
    let stringLength = 0;
    if (version > 1) { stringLength = deckByteArray[2]; }
    const totalCardBytes = deckByteArray.length - stringLength;
    // grab the string size

    let calcCheckSum = 0;
    for (let i = 3; i < totalCardBytes; i++) { calcCheckSum += deckByteArray[i]; }
    calcCheckSum = (calcCheckSum & 0xFF);

    // comapre checksums
    return checkSum === calcCheckSum ? true : false;
  }

  public static trimAndFixDeckCode(deckCodeWithPrefix: string): string { return deckCodeWithPrefix.replace("-", "/").replace("_", "=").slice(3); }

  public static async requestDeckObject(deckCodeWithPrefix: string) {
    const dbUrl = getDBUrl(deckCodeWithPrefix);
    const result = await axiosGet(dbUrl);

    return result;
  }
}
