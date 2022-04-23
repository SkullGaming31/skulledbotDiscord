const { MessageEmbed, Message, TextChannel } = require('discord.js');
const DB = require('../../Structures/Schemas/settingsDB');
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
		const { guild, member } = message;
		const Data = await DB.findOne({ GuildID: guild.id });
		if (!Data) return;

		// const nowLive = process.env.DISCORD_PROMOTE_CHANNEL_ID;
		const linkWhitelist = [
			'https://twitch.tv/', 'twitch.tv/',
			'https://twitter.com/', 'twitter.com/',
			'https://instagram.com/', 'instagram.com/',
			'https://tiktok.com/', 'tiktok.com/',
			'https://github.com/', 'github.com/',
		];
		// if (message.member.permissions.has('MANAGE_MESSAGES')) return;
				const targetChannel = message.guild.channels.cache.find(channel => channel.id === Data.LoggingChannel);// Logs Channel
		let foundInText = false;

		const nowlive = message.guild.channels.cache.get(Data.PromotionChannel); // now-live ChannelID
		for (const link in linkWhitelist) {
			if (message.author.bot) return;
			if (message.content.toLowerCase().includes(linkWhitelist[link].toLowerCase())) { foundInText = true; }
			if (foundInText && message.channelId !== nowlive) {// NOW LIVE Channel ID
				try {
					const linkDetection = new MessageEmbed()
						.setTitle('Link Detected')
						.setDescription(`:x: ${message.author} **Links should only be posted in ${nowlive}**`)
						.setColor('RED')
						.setFooter({ text: `${guild.name}` })
						.setThumbnail(message.author.avatarURL())
						.setTimestamp();
						
					await message.channel.send({ embeds: [linkDetection] });
					message.delete().catch((e) => { console.error(e); });
					foundInText = false;

					const logsEmbed = new MessageEmbed()
						.setTitle('Automated Message Deletion')
						.setColor('PURPLE')
						.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
						.setDescription(`${message.author.username} posted ${message.content} in ${message.channel}`)
						.setFooter({ text: `${guild.name}` })
						.setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
						.setTimestamp();
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