import { Message } from 'discord.js'
import Command from '../_command'
import { DiscordBot } from '../../discord-bot';

export default class EchoCommand extends Command{

    constructor(){
        let name = 'echo'
        let description = 'echoes the message by the sender'
        super(name, description)
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        const reducer = (accumulator: string, currentValue: string) => accumulator + currentValue
        const messageContent = args.reduce(reducer)
        message.channel.send(messageContent)
    }
}