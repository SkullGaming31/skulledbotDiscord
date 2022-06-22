const { CommandInteraction, Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'kick a member from the server',
	permission: 'KICK_MEMBERS',
	options: [
		{
			name: 'target',
			description: 'the target you want to kick from the guild',
			type: 'USER',
			required: true
		},
		{
			name: 'reason',
			description: 'the reason you want to kick the target from the guild',
			type: 'STRING',
			required: false
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { guild, options } = interaction;

		const User = options.getUser('target');
		let reason = options.getString('reason');
		const Target = guild.members.cache.get(User.id);

		if (Target.roles.highest.position >= interaction.member.roles.highest.position) {
			return interaction.followUp({ content: `${interaction.user.tag}, you cant take action on this user as there role is highter then yours` });
		}

		interaction.deferReply();
		if (!reason) reason = 'No Reason Provided';
		const removedEmbed = new MessageEmbed()
			.setTitle('KICKED')
			.setAuthor({ name: `${User.username}`, iconURL: `${User.displayAvatarURL({ dynamic: true })}` })
			.setColor('RED')
			.addField('Kicked from: ', `${guild.name}`, false)
			.addField('Reason: ', `${reason}`, false)
			.setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
			.setTimestamp();
		try {
			await User.send({ embeds: [removedEmbed] });
			Target.kick(reason);
		} catch (err) { console.error(err); console.log('users dm\'s are diabled'); }

		interaction.followUp({ content: `kicked @${User.tag} Successfully`, embeds: [removedEmbed] });
	}
};