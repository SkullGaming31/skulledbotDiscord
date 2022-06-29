const { Guild, MessageEmbed, WebhookClient } = require('discord.js')
module.exports = {
  name: 'guildCreate',
  /** 
   * @param {Guild} guild 
   */
  async execute(guild) {
    const newGuild = await guild.fetch();
    const guildOwner = await guild.fetchOwner();

    const embed = new MessageEmbed()
      .setTitle('NEW GUILD ADDED')
      .setThumbnail(`${newGuild.iconURL({ dynamic: true }) || ''}`)
      .setAuthor({ name: `${guildOwner.displayName}`, iconURL: `${guildOwner.displayAvatarURL({ dynamic: true })}` })
      .addFields([
        {
          name: 'Created: ',
          value: `${new Date(newGuild.createdAt)}`,
          inline: true
        },
        {
          name: 'Member Count: ',
          value: `${newGuild.memberCount}`,
          inline: true
        },
        {
          name: 'Partnered: ',
          value: `${newGuild.partnered}`,
          inline: true
        },
        {
          name: 'Verified: ',
          value: `${newGuild.verified}`,
          inline: true
        }
      ])
      .setColor('RANDOM')
      .setFooter({ text: `GuildID: ${guild.id}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` })
      .setTimestamp();

    try {
      new WebhookClient({ url: 'https://discord.com/api/webhooks/989881550634094602/KrkoXOeXkNtpaypxvkEPeWa-MpgLQE3vYbpCtcXblsQx-XBQHLxn8GJkxeA7rr9mI5N7' }
      ).send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
}