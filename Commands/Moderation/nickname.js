const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'nickname',
	description: 'manage someones nickname in your server',
	permission: 'MANAGE_NICKNAME',
	options: [
		{
			name: 'target',
			description: 'The target you want to manage the nickname for',
			type: 'USER',
			required: true
		},
		{
			name: 'nickname',
			description: 'the nickname you want to give them in your server',
			type: 'STRING',
			required: false
		},
		{
			name: 'reason',
			description: 'The reason you are changing there nickname in the server',
			type: 'STRING',
			required: false
		},
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, guild } = interaction;
		const Nickname = options.getUser('target');
		const Target = guild.members.cache.get(Nickname.id);
		const Reason = options.getString('reason') || 'No Reason Provided';
		const setNickname = options.getString('nickname') || null;

		const embed = new MessageEmbed()
			.setTitle('NICKNAME EDITED')
			.setDescription(`Nickname has been successfully changed to ${setNickname}. Reason: ${Reason}`)
			.setColor('RED');
		try {
			await Target.setNickname(setNickname, Reason);
			interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (error) {
			console.error(error);
		}
	}
}