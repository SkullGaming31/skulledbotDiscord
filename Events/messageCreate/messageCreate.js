const { MessageEmbed, Message } = require('discord.js');
const DB = require('../../Structures/Schemas/settingsDB');
const { NITRADO_API, NITRADO_ID } = require('../../Structures/config');
const axios = require('axios');

module.exports = {
	name: 'messageCreate',
	/**
	 *
	 * @param {Message} message
	 * @returns
	 */
	async execute(message) {
		const channel = (await message.guild.channels.fetch(message.channel.id)).name;
		// const mentioned = (await message.guild.members.fetch(message.author.id)).displayName;
		console.log(`${message.author.tag} Said: ${message.content} in #${channel}`);

		if (message.author.bot) return;
		// const response = await axios.get('https://api.nitrado.net/services/11207410/gameservers', {
		// 	headers: {
		// 		'Authorization': `Bearer ${NITRADO_API}`,
		// 		'Accept': 'application/json',
		// 		'User-Agent': 'Personal Discord Bot (https://github.com/skullgaming31/skulledbotDiscord)'
		// 	}
		// });
		const { author, guild, guildId, member, channelId } = message;
		setInterval(() => {
			// guild.channels.cache.get('989220503254351943').setName(`Online: ${response.data.data.gameserver.query.player_current || '0'}`);
		}, 600000);
		// if (member.permissions.has('MANAGE_MESSAGES')) return; // if they have the manage messages permission ignore wat ever they type.
		const mentionedMember = message.mentions.members.first();

		const Data = await DB.findOne({ GuildID: guild.id });
		if (!Data) return;

		const adminRole = guild.roles.cache.get(Data.AdministratorRole); // Admin Role ID
		const modRole = guild.roles.cache.get(Data.ModeratorRole); // Moderator Role ID

		switch (guildId) {
			case '797740303176040498':// My Guild

				//Going LIVE posts

				setInterval(() => {// done in milliSeconds
					try {
						const spamChannel = guild.channels.cache.get('821768284436430858');
						const facts = [
							'After the Eiffel Tower was built, one person was killed during the installation of the lifts. No one was killed during the actual construction of the tower',
							'The first toilet tank ever seen on television was on Leave it to Beaver',
							'Only one person in two billion will live to be 116 or older',
							'The Great Pyramids used to be as white as snow because they were encased in a bright limestone that has worn off over the years'
						];
						let randomFact = facts[Math.floor(Math.random() * facts.length)];
						const factsEmbed = new MessageEmbed()
							.setTitle('Fact')
							.setDescription(`\`${randomFact}\``)
							.setThumbnail(`${guild.iconURL({ dynamic: true }) || ''}`)
							.setColor('RANDOM')
							.setFooter({ text: 'Fact of the Day' })
						spamChannel.send({ embeds: [factsEmbed] });
					} catch (error) { console.error(error); }
				}, 86400000);

				/* if (mentionedMember) { // Anti-Ping System
					if (mentionedMember.roles.cache.has(adminRole.id) || mentionedMember.roles.cache.has(modRole.id)) {
						const warning = new MessageEmbed()
							.setTitle('WARNING')
							.setDescription(`**Please do not ping a Moderator or Admin**, Leave your question in ${communitySupport} and we will get to it as soon as possible`)
							.setColor('RED')
							.setFooter({ text: `${guildName}` })
							.setThumbnail(message.author.avatarURL({ dynamic: true }));
						await message.reply({ embeds: [warning], allowedMentions: ['users'] });
						setTimeout(() => {
							message.delete();
						}, 1 * 5000);
					}
				} */
				break;
			case '819180459950473236':// modvlogs guild
				break;
			case '722110257911824445':// dayz server discord
				break;
			case '985309600347717672': // lonnys guild
				break;
		}
	},
};
