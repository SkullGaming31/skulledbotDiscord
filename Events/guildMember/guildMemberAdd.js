const { MessageEmbed, GuildMember, WebhookClient, Interaction } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	/**
	 * 
	 * @param {GuildMember} member 
	 */
	async execute (member) {
		const Welcomer = new WebhookClient({
			id: '942960120986497054',
			token: 'MN2nL-7qvlGcU2mYe5eGzLIO1lInjiEASc6XlMd7wnV0wtC7Ij3Z2_dIYjrjjcuhOq50'
		});
		const { user, guild } = member;

		switch(guild.id) {
		case '797740303176040498':// My Guild ID
			member.roles.add('799629973270298675');
			break;
		case '819180459950473236':// mods Guild ID
			member.roles.add('879461309870125147');
			break;
		}
		const Welcome = new MessageEmbed()
			.setColor('#32CD32')
			.setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
			.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
			.setDescription(`Welcome \`${member}\` to the **${guild.name}**`)
			.addFields([
				{
					name: 'Account Created: ',
					value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
					inline: true
				},
				{
					name: 'Latest Member Count: ',
					value: `${guild.memberCount}`,
					inline: true
				}
			])
			.setFooter({ text: `ID: ${user.id}`, iconURL: `${guild.iconURL({ dynamic: true })}` });

		Welcomer.send({ embeds: [Welcome]});
	},
};