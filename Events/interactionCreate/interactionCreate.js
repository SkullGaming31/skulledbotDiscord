const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'interactionCreate',

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 * @returns 
	 */

	async execute(interaction, client) {
		const logsChannel = process.env.DISCORD_LOGS_CHANNEL_ID;
		const targetChannel = interaction.guild.channels.cache.find(channel => channel.id === logsChannel);// Logs Channel
		const logsEmbed = new MessageEmbed()
			.setTitle('Command Usage Detection')
			.setDescription(`${interaction.user} used /${interaction.commandName} in ${interaction.channel.name}`) // user commandUsed inwhatchannel
			.setColor('GREEN')
			.setTimestamp(Date.now());
		if (targetChannel.isText()) await targetChannel.send({ embeds: [logsEmbed] });

		
		
		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return interaction.reply({ embeds: [
				new MessageEmbed()
					.setColor('RED')
					.setDescription('⛔ an error occured while running this command')
			]}) && client.commands.delete(interaction.commandName);

			command.execute(interaction, client);
		}
	},
};