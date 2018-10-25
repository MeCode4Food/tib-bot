import { Message } from 'discord.js'
import Command from '../_command'
import { DiscordBot } from '../../discord-bot';

export default class PingCommand extends Command{

    constructor(){
        let name = 'ping'
        let description = 'returns pong'
        super(name, description)
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        message.channel.send('Pong!')
    }
}