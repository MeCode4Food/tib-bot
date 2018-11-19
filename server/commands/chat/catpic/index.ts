import { Message } from "discord.js";
import { ChatCommand } from "../../_command";
import { DiscordBot } from "../../../discord-bot";
import { axiosGet } from "../../../services/axios";
import { AxiosRequestConfig } from "axios";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

export default class CatPicCommand extends ChatCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "catpic"; // command name that comes after the prefix
        this.description = "Gets you a random cat picture"; // description of the example command
        this.hidden = false;
        this.commandGroup = "chat";
    }

    public async execute(discordBot: DiscordBot, message: Message, args: string[]): Promise<void> {
        try {
            const catQueryParams: AxiosRequestConfig = {
                headers: {
                    "x-api-key": process.env.CAT_API_KEY
                },
                params: {
                    mime_types: "jpg, png",
                    size: "small"
                }
            };

            const catResult = await axiosGet(CAT_API_URL, catQueryParams);
            const catImageURL = catResult.data[0].url;

            message.channel.send(catImageURL); // replace this with something you want to do
        } catch (error) {
            throw error;
        }
    }
}
