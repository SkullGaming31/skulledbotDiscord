const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const { NITRADO_API, NITRADO_ID } = require('../../Structures/config');

module.exports = {
	name: 'dayd',
	description: 'Check the status of the DAYD Dayz Server',
	permission: 'SEND_MESSAGES',

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { user } = interaction;
		/* const data = await axios.get(`https://api.nitrado.net/services/${NITRADO_ID}/gameservers?query=player_current`, {
			headers: {
				'Authorization': `Bearer ${NITRADO_API}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'User-Agent': 'Personal Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)'
			}
		});

		if (data.status === 'success') return console.log(data); */

		const response = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
			.addFields([
				{
					name: 'Server Status: ',
					value: 'WIP',
					inline: false
				},
				{
					name: 'Dayz Server Name',
					value: 'DAYD | 24/7 Raids | 2x Loot | full Cars | Killfeed | Traders | .gg/MHPwjEh75s',
					inline: false
				},
				{
					name: 'Map',
					value: 'chernarusplus',
					inline: true
				},
				{
					name: 'Players Online: ',
					value: 'N/A',
					inline: true
				},
				{
					name: 'Max Players: ',
					value: '20',
					inline: false
				}
			])
			.setTimestamp();


		interaction.reply({ embeds: [response] });
	}
}