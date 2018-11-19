import Card from "../../../../helper/models/card";
import { axiosGet } from "../../../../services/axios";

export async function getCardfromUrl(dbUrl: string): Promise<Card|null> {
  try {
    const response: any = (await axiosGet(dbUrl)).data.data;
    let card: Card| null = null;
    if (response) { card = new Card(response); }
    return card;
  } catch (error) {
    throw error;
  }
}
