/* eslint-disable indent */
/* eslint-disable no-unreachable */
const { ButtonInteraction, Colors, EmbedBuilder } = require('discord.js');
const DB = require('../../Structures/Schemas/suggestDB');

module.exports = {
	name: 'interactionCreate',
	/**
	 * 
	 * @param {ButtonInteraction} interaction 
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({ content: 'you **cannot** use this button', ephemeral: true });
		const { guildId, customId, message } = interaction;

		DB.findOne({ GuildID: guildId, MessageID: message.id }, async (err, data) => {
			if (err) throw err;
			if (!data) return interaction.reply({ content: 'No data found in the Database', ephemeral: true });

			const Embed = message.embeds[0];
			if (!Embed) return;

			switch (customId) {
				case 'sugges-accept': {
					Embed.fields[2] = { name: 'Status: ', value: 'Accepted', inline: true };
					await message.edit({ embeds: [EmbedBuilder.from(Embed).setColor(Colors.Green)], components: [] });
					return interaction.reply({ content: 'Suggestion Accepted', ephemeral: true });
				}
					break;
				case 'sugges-decline': {
					Embed.fields[2] = { name: 'Status: ', value: 'Declined', inline: true };
					await message.edit({ embeds: [EmbedBuilder.from(Embed).setColor(Colors.Red)], components: [] });
					return interaction.reply({ content: 'Suggestion Declined', ephemeral: true });
				}
					break;
			}
		});
		if (!DB) return;
	}
};