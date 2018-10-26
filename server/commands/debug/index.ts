import { Message } from 'discord.js'
import { DiscordBot } from '../../discord-bot'
import Command from '../_command'

export default class BetaWaitCommand extends Command{

    constructor(){
        let name = 'betawait' // command name that comes after the prefix
        let description = 'Describes beta wait' // description of the example command
        super(name, description)
    }

    public execute(discordBot: DiscordBot, message: Message, args: string[]){
        const pickEmoji = '⛏️'
        const feelsBadManEmoji = message.guild.emojis.find(e => e.name === 'FeelsBadMan')

        if(feelsBadManEmoji){
            let emojiCouplet = pickEmoji + feelsBadManEmoji
            let messageToSend = `${emojiCouplet} HOW ${emojiCouplet} LONG  ${emojiCouplet} CAN ${emojiCouplet} THIS ${emojiCouplet} GO ${emojiCouplet} ON ${emojiCouplet} `
            message.channel.send(messageToSend)
        }
    }
}