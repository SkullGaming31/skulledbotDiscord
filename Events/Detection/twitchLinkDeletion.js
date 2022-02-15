const { MessageEmbed, Message, TextChannel } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	/**
	 * 
	 * @param {Message} message 
	 * @param {CommandInteraction} interaction
	 * @returns 
	 */
	async execute(message) {
		const nowLive = process.env.DISCORD_PROMOTE_CHANNEL_ID;
		const logsChannel = process.env.DISCORD_LOGS_CHANNEL_ID;
		const linkWhitelist = [
			'https://twitch.tv/', 'twitch.tv/',
			'https://twitter.com/', 'twitter.com/',
			'https://instagram.com/', 'instagram.com/',
			'https://tiktok.com/', 'tiktok.com/',
			'https://github.com/', 'github.com/',
		];
		// if (message.member.permissions.has('MANAGE_MESSAGES')) return;
		const targetChannel = message.guild.channels.cache.find(channel => channel.id === logsChannel);// Logs Channel
		let foundInText = false;
		const guildName = message.guild.name;

		const nowlive = message.guild.channels.cache.get(nowLive); // now-live ChannelID
		for (const link in linkWhitelist) {
			if (message.author.bot) return;
			if (message.content.toLowerCase().includes(linkWhitelist[link].toLowerCase())) { foundInText = true; }
			if (foundInText && message.channelId !== nowLive) {// NOW LIVE Channel ID
				try {
					const linkDetection = new MessageEmbed()
						.setTitle('Link Detected')
						.setDescription(`:x: ${message.author} **Links should only be posted in ${nowlive}**`)
						.setColor('RED')
						.setFooter(`${guildName}`)
						.setThumbnail(message.author.avatarURL())
						.setTimestamp(Date.now());
						
					await message.channel.send({ embeds: [linkDetection] });
					message.delete().catch((e) => { console.error(e); });
					foundInText = false;

					const logsEmbed = new MessageEmbed()
						.setTitle('Automated Message Deletion')
						.setDescription(`${message.author.username} posted ${message.content} in ${message.channel}`)
						.setColor('PURPLE')
						.setTimestamp(Date.now());
					if (targetChannel.isText()) await targetChannel.send({ embeds: [logsEmbed] });
					if (!foundInText) break;
				}
				catch (e) {
					console.log(e);
					return;
				}
			}
		}
	},
};