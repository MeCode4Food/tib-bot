import { Message } from 'discord.js'
import { DiscordBot } from '../../discord-bot';

export default class Command{
    name: string
    description: string

    constructor(name: string, description: string){
        this.name = name
        this.description = description
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        message.channel.send('Pls implement method LEL')
    }

    public debug(){
        console.log("inside here!")
    }
}