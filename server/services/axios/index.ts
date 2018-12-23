import chalk from "chalk";
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

export async function axiosGet(url: string, params?: AxiosRequestConfig): Promise<any> {
  console.log(chalk.green("GET:") + chalk.cyan(url));
  return params ? await axios.get(url, params) : await axios.get(url);
}

export async function axiosPostSecret(url: string, body: any): Promise<any> {
  body.secret = process.env.DB_API_SECRET;

  return await axios.post(url, body).then((response) => {
    console.log(chalk.green(`POST:${response.status} `) + chalk.cyan(url) + "  " + _.truncate(JSON.stringify(body)));
  });
}
