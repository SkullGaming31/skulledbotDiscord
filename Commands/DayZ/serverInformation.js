const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const { NITRADO_API, NITRADO_ID } = require('../../Structures/config');

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
		const { options, user, member, guild } = interaction;

		const Action = options.getString('action');
		const Restart = options.getMember('restart_message');

		// if (guild.id !== '985309600347717672') return interaction.reply({ content: 'Sorry but this command is for a DayZ Discord only.', ephemeral: true });

		switch (Action) {
			case 'Serverinfo':
				// const response = await axios.get('https://api.nitrado.net/services/11207410/gameservers', {
				// 	headers: {
				// 		'Authorization': `Bearer ${NITRADO_API}`
				// 	}
				// });
				// console.log(response);
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
							name: 'Platform',
							value: 'XBOX',
							inline: true,
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
				/* const nitrado = axios.create({ baseURL: `https://api.nitrado.net/services/${NITRADO_ID}/gameservers` });

				nitrado.post('/restart', {
					headers: {
						'Authorization': `Bearer ${NITRADO_API}`,
						'Accept': 'application/json',
						'User-Agent': 'Personal Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)'
					}
				}); */
				if (!member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'you do not have permission to use this command', ephemeral: true });
				interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
				break;
			case 'Stop':
				if (!member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'you do not have permission to use this command', ephemeral: true });
				interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
				break;
		}
	}
}