const { ChatInputCommandInteraction } = require('discord.js');
const editReply = require('../../Systems/editReply');

module.exports = {
	name: 'interactionCreate',
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */

	async execute(interaction) {
		if (interaction.isSelectMenu()) {
			if (interaction.customId !== 'reaction-roles') return;
			await interaction.deferReply({ ephemeral: true });
			const roleId = interaction.values[0];
			const role = interaction.guild.roles.cache.get(roleId);

			const hasRole = interaction.member.roles.cache.has(roleId);

			if (hasRole) {
				interaction.member.roles.remove(roleId);
				// interaction.editReply({ content: `${role.name} has been removed from you` });
				editReply(interaction, '✔', `${role.name} has been removed from you`);
			} else {
				interaction.member.roles.add(roleId);
				// interaction.editReply({ content: `${role.name} has been added to your roles` });
				editReply(interaction, '✔', `${role.name} has been added to your roles`);
			}
		}
	}
};