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

    const $nCurrentByteIndex = [0];
    const $nTotalBytes = deckByteArray.length;
    // check version num
    const $nVersionAndHeroes = deckByteArray[$nCurrentByteIndex[0]++];
    const $version = $nVersionAndHeroes >> 4;

    if (currentVersion !== $version && $version !== 1) { return false; }

    // do checksum check
    const $nChecksum = deckByteArray[$nCurrentByteIndex[0]++];
    let $nStringLength = 0;
    if ($version > 1) { $nStringLength = deckByteArray[$nCurrentByteIndex[0]++]; }
    const $nTotalCardBytes = $nTotalBytes - $nStringLength;
    // grab the string size
    // {
    let $nComputedChecksum = 0;
    for (let $i = $nCurrentByteIndex[0]; $i < $nTotalCardBytes; $i++) { $nComputedChecksum += deckByteArray[$i]; }
    const $masked = ($nComputedChecksum & 0xFF);
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
