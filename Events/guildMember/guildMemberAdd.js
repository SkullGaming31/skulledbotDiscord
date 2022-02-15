const { MessageEmbed, GuildMember, WebhookClient, Interaction } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	/**
	 * 
	 * @param {GuildMember} member 
	 */
	async execute (member) {
		console.log('New Member Joined: ', member);
		const { user, guild } = member;

		member.roles.add('799629973270298675');
		const Welcomer = new WebhookClient({
			id: '942960120986497054',
			token: 'MN2nL-7qvlGcU2mYe5eGzLIO1lInjiEASc6XlMd7wnV0wtC7Ij3Z2_dIYjrjjcuhOq50'
		});
		const Welcome = new MessageEmbed()
			.setColor('#32CD32')
			.setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
			.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
			.setDescription(`Welcome ${member} to the **${guild.name}**\n
			Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
			.setFooter({ text: `ID: ${user.id}`, iconURL: `${guild.iconURL({ dynamic: true })}` });

		Welcomer.send({ embeds: [Welcome]});
	},
};