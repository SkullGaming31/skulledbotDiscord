const { CommandInteraction } = require('discord.js');
const ReactionRolesDB = require('../../Structures/Schemas/ReactionRolesDB');

module.exports = {
  name: 'remove-role',
  description: 'remove a custom created reaction role',
  permission: 'MANAGE_ROLES',
  options: [
    {
      name: 'role',
      description: 'role to be removed',
      type: 'ROLE',
      required: true
    }
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, guildId } = interaction;
    const Role = options.getRole('role');

    if (Role.position >= guild.me.roles.highest.position) return interaction.reply({ content: 'i cant remove a role that is higher or equal to my rank', ephemeral: true });

    const guildData = await ReactionRolesDB.findOne({ GuildID: guildId });
    if (!guildData) return interaction.reply({ content: 'there are no roles added for this server, please use ``/add-role``', ephemeral: true });

    const guildRoles = guildData.Roles;

    const findRole = guildRoles.find(x => x.roleId === Role.id);
    if (!findRole) return interaction.reply({ content: 'that role is not added to the reaction roles list, please use ' });

    const filteredRoles = guildRoles.filter(x => x.roleId !== Role.id);
    guildData.Roles = filteredRoles;

    await guildData.save();

    interaction.reply({ content: `Removed ${Role.name} from reaction roles`, ephemeral: true });
  }
}