/* eslint-disable indent */
const { GuildMember, WebhookClient, Colors, EmbedBuilder } = require('discord.js');
const config = require('../../Structures/config');

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * @param {GuildMember} member 
	 */
	async execute(member) {
		const Welcomer = new WebhookClient({
			id: config.WELCOMER_ID,
			token: config.WELCOMER_TOKEN
		});
		const { user, guild } = member;

		const Welcome = new EmbedBuilder()
			.setColor(Colors.LightGrey)
			.setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
			.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
			.setDescription(`Welcome \`${member.displayName}\` to the **${guild.name}**`)
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
			.setFooter({ text: `ID: ${user.id}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` });

		switch (guild.id) {
			case '797740303176040498':// My Guild ID
				member.roles.add('799629973270298675');
				await guild.channels.cache.get('989844857684119603').setName(`Members: ${guild.memberCount}`);
				Welcomer.send({ content: `${member}`, embeds: [Welcome] });
				break;
		}
	},
};