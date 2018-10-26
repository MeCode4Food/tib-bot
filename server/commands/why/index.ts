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
        const reeEmoji = message.guild.emojis.find(e=>e.name==="REEE")

        message.channel.send(`Stay away from Discord Commando ${reeEmoji ? reeEmoji.toString() + reeEmoji.toString() + reeEmoji.toString() : 'REEE'}`)
    }
}