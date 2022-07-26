const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
/**
 * 
 * @param {ChatInputCommandInteraction} interaction
 */
async function EditReply(interaction, emoji, description) {
	interaction.editReply({
		embeds: [
			new EmbedBuilder()
				.setColor('Blue')
				.setDescription(`${emoji} | ${description}`)
		]
	});
}
module.exports = EditReply;