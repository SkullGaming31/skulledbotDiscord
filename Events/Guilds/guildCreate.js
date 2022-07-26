/* eslint-disable indent */
const { Guild, WebhookClient, Colors, EmbedBuilder } = require('discord.js');
const { NEW_GUILD_ADDED_WEBHOOK } = require('../../Structures/config');

module.exports = {
	name: 'guildCreate',
	/** 
	 * @param {Guild} guild 
	 */
	async execute(guild) {
		const newGuild = await guild.fetch();
		const guildOwner = await guild.fetchOwner();
		const guildWebhooks = await guild.fetchWebhooks();
		// console.log(guildWebhooks.forEach(wh => console.log(wh))); // Gather Webhook Info
		// console.log(newGuild.invites.cache.map(async (i) => i.code));
		if (newGuild.defaultMessageNotifications === 1) newGuild.defaultMessageNotifications = 'ONLY_MENTIONS'; else newGuild.defaultMessageNotifications = 'ALL_MESSAGES';
		if (newGuild.verificationLevel === 0) newGuild.verificationLevel = 'NONE';
		if (newGuild.verificationLevel === 1) newGuild.verificationLevel = 'LOW';
		if (newGuild.verificationLevel === 2) newGuild.verificationLevel = 'MEDIUM';
		if (newGuild.verificationLevel === 3) newGuild.verificationLevel = 'HIGH';
		if (newGuild.verificationLevel === 4) newGuild.verificationLevel = 'VERY HIGH';

		const embed = new EmbedBuilder()
			.setTitle('NEW GUILD ADDED')
			.setThumbnail(newGuild.iconURL({ dynamic: true }))
			.setAuthor({ name: `${guildOwner.displayName}`, iconURL: `${guildOwner.displayAvatarURL({ dynamic: true })}` })
			.addFields([
				{
					name: 'Created: ',
					value: `${new Date(newGuild.createdAt)}`,
					inline: true
				},
				{
					name: 'Guild Description: ',
					value: `${newGuild.description || 'No Guild Description'}`,
					inline: true
				},
				{
					name: 'MessageNotifications: ',
					value: `${newGuild.defaultMessageNotifications}`,
					inline: true
				},
				{
					name: 'Member Count: ',
					value: `${newGuild.memberCount}`,
					inline: false
				},
				{
					name: 'invites',
					value: 'WIP',
					inline: true
				},
				{
					name: 'Partnered: ',
					value: `${newGuild.partnered}`,
					inline: true
				},
				{
					name: 'Verified: ',
					value: `${newGuild.verified}`,
					inline: true
				},
				{
					name: 'VerificationLevel: ',
					value: `${newGuild.verificationLevel}`,
					inline: false
				}
			])
			.setColor(Colors.Green)
			.setFooter({ text: `GuildID: ${guild.id}`, iconURL: guild.iconURL({ dynamic: true }) })
			.setTimestamp();

		try {
			new WebhookClient({ url: NEW_GUILD_ADDED_WEBHOOK }
			).send({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			return;
		}
	}
};