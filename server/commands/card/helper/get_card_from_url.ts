import axios from "axios";
import Card from "../../../helper/models/card";

export async function getCardfromUrl(dbUrl: string): Promise<Card|null> {
  try {
    const response: any = (await axios.get(dbUrl)).data.data;
    let card: Card| null = null;
    if (response) { card = new Card(response); }
    return card;
  } catch (error) {
    throw error;
  }
}
