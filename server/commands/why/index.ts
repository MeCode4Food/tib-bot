import { Message } from 'discord.js'
import Command from '../_command'
import { DiscordBot } from '../../discord-bot';

export default class WhyCommand extends Command{

    constructor(){
        let name = 'why'
        let description = 'explains why we don\'t use Discord Commando Client'
        super(name, description)
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        message.channel.send('Stay away from Discord Commando REEE')
    }
}