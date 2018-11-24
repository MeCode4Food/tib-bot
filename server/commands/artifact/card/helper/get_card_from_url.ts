import Card from "../../../../helper/models/card";
import { axiosGet } from "../../../../services/axios";

export async function getCardfromUrl(dbUrl: string): Promise<Card|null> {
  try {
    let response: any = (await axiosGet(dbUrl)).data;
    let card: Card| null = null;
    let limit = 10;

    // while response isn't "OK", or response isn't "sql results empty", try again until the limit is reached
    while (
      (response.status.code !== 200 ||
      response.status.code !== 1003 ) &&
      !limit ) {
        response = (await axiosGet(dbUrl)).data;
        limit--;
      }

    if (limit === 0) {
      console.log(response);
      throw new Error("Time out connecting to db");
    }

    if (response.status.code === 200) { card = new Card(response.data); }

    return card;
  } catch (error) {
    throw error;
  }
}
