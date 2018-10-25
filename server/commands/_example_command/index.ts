import { Message } from 'discord.js'
import { DiscordBot } from '../../discord-bot'
import Command from '../_command'

export default class ExampleCommand extends Command{

    constructor(){
        let name = 'example' // command name that comes after the prefix
        let description = 'does something' // description of the example command
        super(name, description)
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        message.channel.send('Example command executed!') // replace this with something you want to do
    }
}