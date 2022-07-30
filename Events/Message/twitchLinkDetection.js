const { EmbedBuilder, Message, Colors, ChannelType } = require('discord.js');
// const DB = require('../../Structures/Schemas/settingsDB');
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
		const { guild, member, channel } = message;

		// const nowLive = process.env.DISCORD_PROMOTE_CHANNEL_ID;
		const linkWhitelist = [
			'https://twitch.tv/', 'twitch.tv/',
			'https://twitter.com/', 'twitter.com/',
			'https://instagram.com/', 'instagram.com/',
			'https://tiktok.com/', 'tiktok.com/',
			'https://github.com/', 'github.com/',
		];
		// if (member.permissions.has('MANAGE_MESSAGES') ? true : null) return;
		// if (member.roles.cache.find(role => role.name === 'v.i.p')) return;
		if (channel.id === '798448297257074690') return;// added these cause the bot was deleting messages in the moderator chat
		/* havnt figure out the new permission system yet for dening the bot moderating messages */
		if (channel.parentId === '940754005758472192' || channel.parentId === '821767829811494932') return; // parent channel id for ticket system if you have one, if not delete this line
		const targetChannel = guild.channels.cache.get('838158641072832562');// Logs Channel
		let foundInText = false;

		const nowlive = message.guild.channels.cache.get('799642035371638794'); // now-live ChannelID Data.PromotionChannel
		for (const link in linkWhitelist) {
			if (message.author.bot) return;
			if (message.content.toLowerCase().includes(linkWhitelist[link].toLowerCase())) { foundInText = true; }
			if (foundInText && message.channelId !== nowlive) {
				try {
					const linkDetection = new EmbedBuilder()
						.setTitle('Link Detected')
						.setDescription(`:x: ${message.author} **Links should only be posted in ${nowlive}**`)
						.setColor(Colors.Red)
						.setFooter({ text: `${guild.name}` })
						.setThumbnail(message.author.avatarURL())
						.setTimestamp();

					await message.channel.send({ embeds: [linkDetection] });
					message.delete().catch((e) => { console.error(e); });
					foundInText = false;

					const logsEmbed = new EmbedBuilder()
						.setTitle('Automated Message Deletion')
						.setColor(Colors.Purple)
						.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true }) || ''}` })
						.setDescription(`${message.author.username} posted ${message.content} in ${message.channel}`)
						.setFooter({ text: `${guild.name}` })
						.setThumbnail(message.author.avatarURL({ dynamic: true }))
						.setTimestamp();
					if (channel.type === ChannelType.GuildText) await targetChannel.send({ embeds: [logsEmbed] });
					if (!foundInText) break;
				}
				catch (e) {
					console.error(e);
					return;
				}
			}
		}
	},
};