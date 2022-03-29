const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Returns Pong',
	permission: 'SEND_MESSAGES',

	/**
	* @param {CommandInteraction} interaction
	* @returns
	*/
	async execute(interaction) {
		const pingEmbed = new MessageEmbed()
			.setTitle('/ping')
			.setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
			.addField('Ping: ', `${interaction.client.ws.ping}ms`, true)
			.setColor('GREEN');
		await interaction.deferReply();
		interaction.editReply({	embeds: [pingEmbed] });
	}
};