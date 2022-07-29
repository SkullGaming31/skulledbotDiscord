/* eslint-disable indent */
const { ButtonInteraction, EmbedBuilder, Colors } = require('discord.js');
const DB = require('../../Structures/Schemas/SuggestDB');

module.exports = {
	name: 'interactionCreate',
	/**
	 * 
	 * @param {ButtonInteraction} interaction 
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({ content: 'you ``cannot`` use this button', ephemeral: true });
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
					if (Embed.fields[2].value === 'Accepted') { console.log('Suggestion Accepted, (Posting to Github Issues)'); }
					interaction.reply({ content: 'Suggestion Accepted', ephemeral: true });
				}
					break;
				case 'sugges-decline': {
					Embed.fields[2] = { name: 'Status: ', value: 'Declined', inline: true };
					await message.edit({ embeds: [EmbedBuilder.from(Embed).setColor(Colors.Red)], components: [] });
					if (Embed.fields[2].value === 'Declined') { console.log('Suggestion Declined, Deleting from Database'); }
					interaction.reply({ content: 'Suggestion Declined', ephemeral: true });
				}
					break;
			}
		});
		if (!DB) return;
	}
};