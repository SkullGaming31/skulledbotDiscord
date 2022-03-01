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
		}
	],

	/**
   * 
   * @param {CommandInteraction} interaction 
   */
	async execute(interaction) {
		const { guild, user, options } = interaction;

		const User = options.getUser('target');
		let reason = options.getString('reason');
		const Target = guild.members.cache.get(User.id);

		await interaction.deferReply();
		// check permissions so mods cant ban admins.

		const bannedEmbed = new MessageEmbed()
			.setTitle(`${guild.name}`)
			.setDescription('')
			.addField('Banned from: ', `${guild.name}`, true)
			.addField('Reason: ', `${reason}`, true);

		try {
			await User.send({ embeds: [bannedEmbed] });
			Target.ban({ reason });
		} catch (error) {
			console.error(error);
		}
	}
};