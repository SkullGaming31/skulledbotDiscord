const { CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const ReactionRolesDB = require('../../Structures/Schemas/ReactionRolesDB');

module.exports = {
  name: 'panel',
  description: 'reaction role panel',
  permission: 'MANAGE_ROLES',
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, guildId } = interaction;
    const guildData = await ReactionRolesDB.findOne({ GuildID: guildId });
    if (!guildData?.Roles) return interaction.reply({ content: 'there is no roles inside this server' });

    const options = guildData.Roles.map(x => {
      const role = guild.roles.cache.get(x.roleId);
      return {
        label: role.name,
        value: role.id,
        description: x.roleDescription || 'No Description Provided',
        emoji: x.roleEmoji
      }
    });
    const panelEmbed = new MessageEmbed()
    .setTitle('Please Select a role below')
    .setColor('RANDOM')

    const components = [
      new MessageActionRow().addComponents(new MessageSelectMenu()
      .setCustomId('reaction-roles')
      .setMaxValues(1)
      .addOptions(options))
    ];
    interaction.reply({ content: 'sent', ephemeral: true });
    interaction.channel.send({ embeds: [panelEmbed], components })
  }
}