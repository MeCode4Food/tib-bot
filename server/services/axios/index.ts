import chalk from "chalk";
import axios, { AxiosRequestConfig } from "axios";

export async function axiosGet(url: string, params?: AxiosRequestConfig): Promise<any> {
  console.log(chalk.green("GET:") + chalk.cyan(url));
  return params ? await axios.get(url, params) : await axios.get(url);
}
