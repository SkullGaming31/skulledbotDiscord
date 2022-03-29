const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Get info about a server or a specific user ',
	permission: 'ADMINISTRATOR',
	options: [
		{
			name: 'action',
			type: 'STRING',
			description: 'get info on a user or discord server',
			required: true,
			choices: [
				{
					name: 'userinfo',
					value: 'userinfo'
				},
				{
					name: 'serverinfo',
					value: 'serverinfo'
				}
			]
		},
		{
			name: 'member',
			type: 'USER',
			description: 'Used for getting Users Info only, leave out for server info',
			required: false
		}
	],

	/**
	* @param {CommandInteraction} interaction
	* @returns
	*/
	async execute(interaction) {
		const { guild, options, user, member  } = interaction;

		const Action = options.getString('action');
		const Target = options.getMember('member');

		try {
			switch(Action) {
			case 'userinfo':
				await interaction.deferReply();
				if (Target) {
					const taggedEmbed = new MessageEmbed()
					.setColor('GREEN')
					.setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.displayAvatarURL({ dynamic: true, size: 512 })}` })
					.setThumbnail(Target.user.displayAvatarURL({ dynamic: true, size: 512}))
					.addFields([
						{
							name: 'Display Name: ',
							value: `${Target}`
						},
						{
							name: 'Discrimanator',
							value: `#${Target.user.discriminator}`
						},
						{
							name: 'Roles: ',
							value: `${Target.roles.cache.map((r) => r).join(' ').replace('@everyone', '') || 'None'}`
						},
						{
							name: 'Member Since: ',
							value: `<t:${parseInt(Target.joinedTimestamp / 1000)}:R>`
						},
						{
							name: 'Discord User Since: ',
							value: `<t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`
						},
						{
							name: 'Warnings: ', // Hardcoded!
							value: '0'
						},
					])
					.setTimestamp();

					interaction.editReply({ embeds: [taggedEmbed] });
				} else {
					const userInfoEmbed = new MessageEmbed()
					.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
					.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
					.addFields([
						{
							name: 'Username: ',
							value: `${user.username}`,
							inline: true
						},
						{
							name: 'discriminator',
							value: `#${user.discriminator}`,
							inline: true
						},
						{
							name: 'Roles: ',
							value: `${interaction.member.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'None'}`,
							inline: true
						},
						{
							name: 'Member Since: ',
							value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
							inline: true
						},
						{
							name: 'Discord User Since: ',
							value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
							inline: true
						},
						{
							name: 'Warnings: ',
							value: '0',
							inline: true
						}
					])
					.setColor('BLUE')
					.setFooter({ text: `${user.id}` })
					.setTimestamp();
					interaction.editReply({ embeds: [userInfoEmbed] });
				}
				break;
			case 'serverinfo':
				const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers, premiumTier, premiumSubscriptionCount, roles } = guild;
				const serverInfoEmbed = new MessageEmbed()
				.setColor('BLUE')
					.setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` })
					.addFields([
						{
							name: 'GENERAL',
							value: 
							`
							Name: ${guild.name}
							Created: <t:${parseInt(createdTimestamp / 1000)}:R>
							Owner: <@${ownerId}>

							Description: ${description || 'No Description'}
							`
						},
						{
							name: '👨 | USERS',
							value:
							`
							- members: ${members.cache.filter((m) => !m.user.bot).size}
							- Bots: ${members.cache.filter((m) => m.user.bot).size}
							- Roles: ${roles.cache.size}

							Total: ${memberCount}
							`
						},
						{
							name: '🏛 | CHANNELS',
							value:
							`
							- Text: ${channels.cache.filter((c) => c.type === 'GUILD_TEXT').size}
							- Voice: ${channels.cache.filter((c) => c.type === 'GUILD_VOICE').size}
							- Threads: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS_THREAD' && 'GUILD_PUBLIC_THREAD' && 'GUILD_PRIVATE_THREAD').size}
							- Categories: ${channels.cache.filter((c) => c.type === 'GUILD_CATEGORY').size}
							- Stages: ${channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size}
							- News: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS').size}

							- Total: ${channels.cache.size}
							`
						},
						{
							name: '🤯 | EMOJIS & STICKERS',
							value:
							`
							Animated: ${emojis.cache.filter((e) => e.animated).size}
							Static: ${emojis.cache.filter((e) => !e.animated).size}
							Stickers: ${stickers.cache.size}

							Total: ${stickers.cache.size + emojis.cache.size}
							`
						},
						{
							name: '✨ | NITRO STATISTICS',
							value:
							`
							- Tier: ${premiumTier.replace('TIER_', '')}
							- Boosts: ${premiumSubscriptionCount}
							- Boosters: ${members.cache.filter((m) => m.premiumSince).size}
							`
						}
					])
					.setThumbnail(`${guild.iconURL({ dynamic: true }) || ''}`)
					.setFooter({ text: 'Last Checked' })
					.setTimestamp();
		
				interaction.reply({ embeds: [serverInfoEmbed] });
				break;
			}
		} catch (error) { console.error(error); }
	}
};