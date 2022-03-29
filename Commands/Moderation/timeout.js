const { CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'timeout',
	description: 'Timeout a user from sending messages or joining a voice channel',
	permission: 'MANAGE_MESSAGES', // permissions error, Missing Permissions
	options: [
		{
			name: 'target',
			description: 'the user you want to timeout',
			type: 'USER',
			required: true
		},
		{
			name: 'length',
			description: 'how long do you want to timeout the user',
			type: 'STRING',
			required: true
		},
		{
			name: 'reason',
			description: 'reason for timing out the user',
			type: 'STRING',
			required: false
		}
	],
	/**
   * 
   * @param {CommandInteraction} interaction 
   */
	async execute(interaction) {
		const { channel, options } = interaction;

		const Target = options.getMember('target');
		const Length = options.getString('length');
		let reason = options.getString('reason');
		
		const timeInMs = ms(Length) / 1000;

		try {
			// await interaction.deferReply();
			if (!timeInMs) return interaction.reply({ content: 'Please specify a valid time' });
			if (!reason) reason = 'No Reason Provided';

			const timedoutEmbed = new MessageEmbed()
				.setTitle(`${Target.displayName}`)
				.addField('Timed Out for: ', `\`${timeInMs}\``, true)
				.addField('Reason: ', `\`${reason}\``, true)
				.setColor('RED');
			interaction.reply({ embeds: [timedoutEmbed] });
			Target.timeout(timeInMs, reason);
		} catch (error) {
			console.error(error);
		}
	}
};