const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const ReactionRolesDB = require('../../Structures/Schemas/ReactionRolesDB');
const Reply = require('../../Systems/reply');

module.exports = {
	name: 'remove-role',
	description: 'remove a custom created reaction role',
	UserPerms: ['ManageRoles'],
	BotPerms: ['ManageRoles'],
	options: [
		{
			name: 'role',
			description: 'role to be removed',
			type: ApplicationCommandOptionType.Role,
			required: true
		}
	],
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options, guild, guildId } = interaction;
		const Role = options.getRole('role');

		if (Role.position >= guild.roles.highest.position) return await Reply(interaction, '❌', 'i cant remove a role that is higher or equal to my rank', true);

		const guildData = await ReactionRolesDB.findOne({ GuildID: guildId });
		if (!guildData) return interaction.reply({ content: 'there are no roles added for this server, please use ``/add-role``', ephemeral: true });

		const guildRoles = guildData.Roles;

		const findRole = guildRoles.find(x => x.roleId === Role.id);
		if (!findRole) return interaction.reply({ content: 'that role is not added to the reaction roles list, please use ``/add-role``' });

		const filteredRoles = guildRoles.filter(x => x.roleId !== Role.id);
		guildData.Roles = filteredRoles;

		await guildData.save();

		await Reply(interaction, '✔', `Removed ${Role.name} from reaction roles`, true);
		// interaction.reply({ content: `Removed ${Role.name} from reaction roles`, ephemeral: true });
	}
};