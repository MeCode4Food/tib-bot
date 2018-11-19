import { axiosGet } from "../../../../services/axios";

export async function pingCardRepo(): Promise<boolean> {
  try {
    let count = 10;
    while (count) {
      const dbUrl = `http://${process.env.DB_API_URL}:${process.env.DB_API_PORT}/info`;
      const response: any = (await axiosGet(dbUrl));

      if (response) { return true; }
      count--;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
