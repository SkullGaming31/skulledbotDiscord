const { MessageEmbed, Message } = require('discord.js');
const settingsDB = require('../../Structures/Schemas/settingsDB');

module.exports = {
	name: 'messageCreate',
	/**
	 * 
	 * @param {Message} message 
	 * @param {CommandInteraction} interaction
	 * @returns 
	 */
	async execute(message) {
		const { guild, member } = message;

		const Data = await settingsDB.findOne({ GuildID: guild.id });
		if (!Data) return;

		if (member.permissions.has('MANAGE_MESSAGES')) return;

		if (guild.id !== '797740303176040498') return;

		// const logsChannel = process.env.DISCORD_LOGS_CHANNEL_ID;
		const targetChannel = guild.channels.cache.find(channel => channel.id === Data.LoggingChannel);
		const discordInviteList = ['discord.com/invite/', 'discord.com/', 'discord.gg/', 'https://discord.com/invite/', 'https://discord.com/', 'https://discord.gg/', '.gift'];

		let sentInText = false;
		for (const dInvite in discordInviteList) {// discord link detection
			if (message.content.toLowerCase().includes(discordInviteList[dInvite].toLowerCase())) { sentInText = true; }
			if (sentInText) {
				const discordLinkDetection = new MessageEmbed()// sends to channel the link was posted too.
					.setTitle('Discord Link Detected')
					.setDescription(`:x: ${message.author} **Do not post discord links in this server.**`)
					.setColor('RED')
					.setFooter({ text: `${guild.name}` })
					.setThumbnail(message.author.avatarURL())
					.setTimestamp();

				sentInText = false;

				await message.channel.send({ embeds: [discordLinkDetection] }); // send this warning embed to the channel the link was detected in
				message.delete().catch(error => { console.error(error); });


				const logsEmbed = new MessageEmbed()// embed to be sent to the logs channel
					.setTitle('Automated Message Deletion')
					.setDescription(`${message.author.username} posted ${message.content} in ${message.channel}`)
					.setColor('PURPLE')
					.setFooter({ text: `${guild.name}` })
					.setTimestamp();

				if (targetChannel.isText()) {
					await targetChannel.send({ embeds: [logsEmbed] });
					if (!sentInText) break;
				}
			}
		}
	},
};