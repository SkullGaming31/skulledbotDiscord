const { CommandInteraction } = require('discord.js');
const ReactionRolesDB = require('../../Structures/Schemas/ReactionRolesDB');

module.exports = {
  name: 'add-role',
  description: 'add a custom reaction role',
  permission: 'MANAGE_ROLES',
  options: [
    {
      name: 'role',
      description: 'role to be assigned',
      type: 'ROLE',
      required: true
    },
    {
      name: 'description',
      description: 'Description of this role',
      type: 'STRING',
      required: false
    },
    {
      name: 'emoji',
      description: 'Emoji for the role',
      type: 'STRING',
      required: false
    }
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, guildId } = interaction;
    const Role = options.getRole('role');
    const roleDescription = options.getString('description') || null;
    const roleEmoji = options.getString('emoji') || null;

    if (Role.position >= guild.me.roles.highest.position) return interaction.reply({ content: 'i cant assign a role that is higher or equal to my rank', ephemeral: true });

    const guildData = await ReactionRolesDB.findOne({ GuildID: guildId });

    const newRole = {
      roleId: Role.id,
      roleDescription,
      roleEmoji
    }
    if (guildData) {
      const roleData = guildData.Roles.find((x) => x.roleId === Role.id)

      if (roleData) {
        roleData = newRole;
      } else {
        guildData.Roles = [...guildData.Roles, newRole];
      }
      await guildData.save();
    } else {
      await ReactionRolesDB.create({
        GuildID: guildId,
        Roles: newRole
      });
    }
    await interaction.reply({ content: `Created a new role ${Role.name}`, ephemeral: true });
  }
}