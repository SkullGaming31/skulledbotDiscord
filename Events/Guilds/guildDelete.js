const { Guild, WebhookClient, Colors, EmbedBuilder } = require('discord.js');
const { NEW_GUILD_ADDED_WEBHOOK } = require('../../Structures/config');
module.exports = {
	name: 'guildDelete',
	/** 
	 * @param {Guild} guild 
	 */
	async execute(guild) {
		const newGuild = await guild.fetch();
		const guildOwner = await guild.fetchOwner();

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
					name: 'Member Count: ',
					value: `${newGuild.memberCount}`,
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
					inline: true
				}
			])
			.setColor(Colors.Green)
			.setFooter({ text: `GuildID: ${guild.id}`, iconURL: guild.iconURL({ dynamic: true }) })
			.setTimestamp();
	}
};