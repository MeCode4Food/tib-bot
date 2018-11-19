import { RichEmbed, Guild } from "discord.js";

export function generateGuildEmbed(guild: Guild): RichEmbed {
    // use format of day/month/year
    const dateString =  guild.createdAt.getDate()  + "/" + (guild.createdAt.getMonth() + 1) + "/" + guild.createdAt.getFullYear();

    const embed: RichEmbed = new RichEmbed()
        .setColor(0xd4d2d1)
        .setThumbnail(guild.iconURL)
        .addField("ID", guild.id, true)
        .addField("Name", guild.name, true)
        .addField("Owner", `${guild.owner.displayName}#${guild.owner.user.discriminator}`, true)
        .addField("Region", guild.region, true)
        .addField("Members", guild.memberCount, true)
        .addField("Humans", guild.members.filter((m) => m.user.bot === false).size, true)
        .addField("Bots", guild.members.filter((m) => m.user.bot === true).size, true)
        .addField("Online", guild.members.filter((m) => m.presence.status === "online").size, true)
        .addField("Roles", guild.roles.filter((r) => r.name !== "@everyone").map((r) => r.name).join(", "), true)
        .setFooter(`Server created at ${dateString}`);

    return embed;
}
