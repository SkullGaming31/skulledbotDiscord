const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'ban a member from the server',
	permission: 'BAN_MEMBERS',
	options: [
		{
			name: 'target',
			description: 'the member you want to ban from the guild',
			type: 'USER',
			required: true
		},
		{
			name: 'reason',
			description: 'the reason your banning them!',
			type: 'STRING',
			required: false
		},
		{
			name: 'days',
			description: 'The amount of days you want to delete messages for, 0-7 days',
			type: 'NUMBER',
			required: false
		}
	],

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { guild, user, options } = interaction;

		const User = options.getUser('target');
		const Target = guild.members.cache.get(User.id);
		let reason = options.getString('reason') || 'No Reason Provided';
		let Days = options.getNumber('days') || 7;

		await interaction.deferReply();
		// check permissions so mods cant ban admins.

		const bannedEmbed = new MessageEmbed()
			.setTitle(`${guild.name}`)
			.setDescription('')
			.setColor('RED')
			.addField('Banned from: ', `${guild.name}`, true)
			.addField('Reason: ', `${reason}`, true);

		try {
			await User.send({ embeds: [bannedEmbed] });
			Target.ban({ reason, days: Days });
			interaction.editReply({ content: `**${Target.displayName}** has been banned from the guild for **${reason}**` });
		} catch (error) { console.error(error); }
	}
};