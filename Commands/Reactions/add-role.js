const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const ReactionRolesDB = require('../../Structures/Schemas/ReactionRolesDB');
const Reply = require('../../Systems/reply');

module.exports = {
	name: 'add-role',
	description: 'add a custom reaction role',
	UserPerms: ['ManageRoles'],
	BotPerms: ['ManageRoles'],
	options: [
		{
			name: 'role',
			description: 'role to be assigned',
			type: ApplicationCommandOptionType.Role,
			required: true
		},
		{
			name: 'description',
			description: 'Description of this role',
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: 'emoji',
			description: 'Emoji for the role',
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options, guild, guildId } = interaction;
		const Role = options.getRole('role');
		const roleDescription = options.getString('description') || null;
		const roleEmoji = options.getString('emoji') || null;

		if (Role.position >= guild.roles.highest.position) return interaction.reply({ content: 'i cant assign a role that is higher or equal to my rank', ephemeral: true });

		const guildData = await ReactionRolesDB.findOne({ GuildID: guildId });

		if (roleDescription <= 57 || roleDescription < 1) return interaction.reply({ content: 'your role description must be between 1 and 56 characters' });

		const newRole = {
			roleId: Role.id,
			roleDescription,
			roleEmoji
		};
		if (guildData) {
			let roleData = guildData.Roles.find((x) => x.roleId === Role.id);

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
		await Reply(interaction, '✔', `Created a new role ${Role.name}`, true);
		// await interaction.reply({ content: `Created a new role ${Role.name}`, ephemeral: true });
	}
};