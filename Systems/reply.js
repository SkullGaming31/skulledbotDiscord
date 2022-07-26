const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 * @param {*} emoji 
 * @param {*} description 
 * @param {*} type 
 */
async function Reply(interaction, emoji, description, type) {
	interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setColor('Blue')
				.setDescription(`${emoji} | ${description}`)
		], ephemeral: type
	});
}
module.exports = Reply;