import { RichEmbed, Collection } from "discord.js";
import { DiscordBot } from "../../../../discord-bot";
import { ICommand, ArtifactCommand, ServerCommand, ChatCommand } from "../../../_command";

export function generateHelpEmbed(discordBot: DiscordBot): RichEmbed {
    const commandList = ( discordBot as any ).commands as Collection<string, ICommand>;

    const embed: RichEmbed = new RichEmbed()
        .setColor(0xd4d2d1);

    const artifactCommandList: ArtifactCommand[] = [];
    const artifactCommand = new ArtifactCommand();

    const chatCommandList: ChatCommand[] = [];
    const chatCommand = new ChatCommand();

    const serverCommandList: ServerCommand[] = [];
    const serverCommand = new ServerCommand();

    commandList.forEach((command) => {

        // hide hidden commands and sort them into types based on ICommand.commandGroup
        if (!command.hidden) {
            switch ((command as ICommand).commandGroup ) {
                case artifactCommand.commandGroup:
                    artifactCommandList.push(command);
                    break;
                case chatCommand.commandGroup:
                    chatCommandList.push(command);
                    break;
                case serverCommand.commandGroup:
                    serverCommandList.push(command);
                    break;
            }
        }
    });

    if (artifactCommandList.length !== 0) {
        let fieldContent = "";
        artifactCommandList.forEach((command: ArtifactCommand, index: number) => {
            fieldContent += `**${command.name}** - ${command.description}`;
            fieldContent += index === artifactCommandList.length - 1 ? "" : "\n";
        });
        embed.addField(`${artifactCommand.commandIconString} Artifact Commands`, fieldContent);
    }

    if (chatCommandList.length !== 0) {
        let fieldContent = "";
        chatCommandList.forEach((command: ChatCommand, index: number) => {
            fieldContent += `**${command.name}** - ${command.description}`;
            fieldContent += index === chatCommandList.length - 1 ? "" : "\n";
        });
        embed.addField(`${chatCommand.commandIconString} Chat Commands`, fieldContent);
    }

    if (serverCommandList.length !== 0) {
        let fieldContent = "";
        serverCommandList.forEach((command: ServerCommand, index: number) => {
            fieldContent += `**${command.name}** - ${command.description}`;
            fieldContent += index === serverCommandList.length - 1 ? "" : "\n";
        });
        embed.addField(`${serverCommand.commandIconString} Server Commands`, fieldContent);
    }

    return embed;
}
