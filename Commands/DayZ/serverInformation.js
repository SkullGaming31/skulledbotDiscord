const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const config = require('../../Structures/config');

module.exports = {
	name: 'dayd',
	description: 'manage the Dayz Server',
	permission: 'SEND_MESSAGES',
	options: [
		{
			name: 'action',
			description: 'add or remove a member from the ticket',
			type: 'STRING',
			required: true,
			choices: [
				{
					name: 'Serverinfo',
					value: 'Serverinfo'
				},
				{
					name: 'Restart',
					value: 'Restart'
				},
				{
					name: 'Stop',
					value: 'Stop'
				}
			]
		},
		{
			name: 'restart_message',
			description: 'Send a message to the ingame chat to notify players the server is restarting',
			type: 'STRING',
			required: false
		}
	],

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, user, member } = interaction;

		const Action = options.getString('action');
		const Restart = options.getMember('restart_message');
		/* const nitrado = axios.create({ baseURL: `https://api.nitrado.net/services/${config.NITRADO_ID}/gameservers` });

		nitrado.post('/restart', {
			headers: {
				'Authorization': `Bearer ${config.NITRADO_API}`,
				'Accept': 'application/json',
				'User-Agent': 'axios/0.26.1'
			}
		}); */

		switch (Action) {
			case 'Serverinfo':
				const server = new MessageEmbed()
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
					]).setTimestamp();
				interaction.reply({ embeds: [server], ephemeral: true });
				break;
			case 'Restart':
				interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
				break;
			case 'Stop':
				interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
				break;
		}
	}
}