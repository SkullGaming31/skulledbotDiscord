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
		}
	],

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, user, member, guild } = interaction;

		const Action = options.getString('action');

		// if (guild.id !== '985309600347717672') return interaction.reply({ content: 'Sorry but this command is for a DayZ Discord only.', ephemeral: true });

		// const SERVER = await axios.post('https://api.nitrado.net/services/11207410/gameservers/restart', {
		// 	headers: {
		// 		'Authorization': `Bearer ${NITRADO_API}`,
		// 		'Accept': 'application/json',
		// 		'User-Agent': 'Personal Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)'
		// 	}
		// });
		const response = await axios.get('https://api.nitrado.net/services/11207410/gameservers', {
			headers: {
				'Authorization': `Bearer ${NITRADO_API}`,
				'Accept': 'application/json',
				'User-Agent': 'Personal Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)'
			}
		})/* .then((res) => { console.log(res.data.data.gameserver.query); }).catch((err) => { console.error(err); }) */;
		// console.log(response.data.data.gameserver);
		switch (Action) {
			case 'Serverinfo':
				const server = new MessageEmbed()
					.setColor('RANDOM')
					.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
					.addFields([
						{
							name: 'Server Status: ',
							value: `${response.data.data.gameserver.status}`,
							inline: false
						},
						{
							name: 'Dayz Server Name',
							value: response.data.data.gameserver.query.server_name,
							inline: false
						},
						{
							name: 'Map',
							value: `${response.data.data.gameserver.query.map || 'Cherno'}`,
							inline: true
						},
						{
							name: 'Platform',
							value: 'XBOX',
							inline: true,
						},
						{
							name: 'Players Online: ',
							value: `${response.data.data.gameserver.query.player_current || '0'}`,
							inline: true
						},
						{
							name: 'Max Players: ',
							value: `${response.data.data.gameserver.query.player_max || '0'}`,
							inline: false
						}
					]).setTimestamp();
				interaction.reply({ embeds: [server], ephemeral: true });
				break;
			case 'Restart':
				if (!member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'you do not have permission to use this command', ephemeral: true });
				interaction.reply({ content: 'Not Currently Implemented', ephemeral: true });
				break;
			case 'Stop':
				if (!member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'you do not have permission to use this command', ephemeral: true });
				interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
				break;
		}
	}
}