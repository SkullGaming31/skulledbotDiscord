const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'warn',
	description: 'Warn a user before taking action',
	permission: 'MANAGE_MESSAGES', 
	options: [
		{
			name: 'target',
			description: 'the user you want to warn',
			type: 'USER',
			required: true
		},
		{
			name: 'reason',
			description: 'reason for warning the user',
			type: 'STRING',
			required: false
		}
	],
	/**
   * @param {CommandInteraction} interaction 
   */
	async execute(interaction) {
		const { options, guild } = interaction;

		const Target = options.getMember('target');
		const User = await guild.members.fetch(Target);
		let reason = options.getString('reason');

		try {
			// await interaction.deferReply();
			if (!reason) reason = 'No Reason Provided';

			const warnningEmbed = new MessageEmbed()
				.setTitle('WARNING')
				.setAuthor({ name: `${Target.displayName}`, iconURL: `${User.displayAvatarURL({ dynamic: true })}` })
				.addField('Reason: ', `\`${reason}\``, true)
				.setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
				.setColor('RED');
			interaction.reply({ embeds: [warnningEmbed] });
		} catch (error) {
			console.error(error);
		}
	}
};