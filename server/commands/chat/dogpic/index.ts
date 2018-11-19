import { Message } from "discord.js";
import { ChatCommand } from "../../_command";
import { DiscordBot } from "../../../discord-bot";
import { axiosGet } from "../../../services/axios";
import { AxiosRequestConfig } from "axios";

const DOG_API_URL = "https://api.thedogapi.com/v1/images/search";

export default class DogPicCommand extends ChatCommand {
    public name: string;
    public description: string;

    constructor() {
        super();
        this.name = "dogpic"; // command name that comes after the prefix
        this.description = "Gets you a random dog picture"; // description of the example command
        this.hidden = false;
        this.commandGroup = "chat";
    }

    public async execute(discordBot: DiscordBot, message: Message, args: string[]): Promise<void> {
        try {
            const dogQueryParams: AxiosRequestConfig = {
                headers: {
                    "x-api-key": process.env.DOG_API_KEY
                },
                params: {
                    mime_types: "jpg, png",
                    size: "small"
                }
            };

            const dogResult = await axiosGet(DOG_API_URL, dogQueryParams);
            const dogImageURL = dogResult.data[0].url;

            message.channel.send(dogImageURL); // replace this with something you want to do
        } catch (error) {
            throw error;
        }
    }
}
