const { MessageEmbed, CommandInteraction, Client, version } = require('discord.js');
const { connection } = require('mongoose');
const os = require('os');

/*
created by KevinFoged
Github: https://github.com/KevinFoged
*/

module.exports = {
	name: 'status',
	description: 'Displays the status of the client and database.',
	permission: 'MANAGE_MESSAGES',
	/**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
	async execute(interaction, client) {
		await client.user.fetch();
		await client.application.fetch();

		const getChannelTypeSize = (type) => client.channels.cache.filter((channel) => type.includes(channel.type)).size;

		const status = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
        
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`🍞 ${client.user.username} Status`)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setDescription(interaction.client.application?.description)
			.addFields(
				{ name: '👩🏻‍🔧 Client', value: client.user.tag, inline: true },
				{ name: '📆 Created', value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
				{ name: '☑ Verified', value: client.user.flags.has('VERIFIED_BOT') ? 'Yes' : 'No', inline: true },
				{ name: '👩🏻‍💻 Bot Owner', value: `${interaction.client.application.owner.tag || 'None'}`, inline: true },
				{ name: '📚 Database', value: status[connection.readyState], inline: true },
				{ name: '🖥 System', value: os.type().replace('Windows_NT', 'Windows').replace('Darwin', 'macOS'), inline: true },
				{ name: '🧠 CPU Model', value: `${os.cpus()[0].model}`, inline: true },
				{ name: '💾 CPU Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
				{ name: '⏰ Up Since', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
				{ name: '👩🏻‍🔧 Node.js', value: process.version, inline: true },
				{ name: '🛠 Discord.js', value: version, inline: true },
				{ name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
				{ name: '🤹🏻‍♀️ Commands', value: `${client.commands.size}`, inline: true },
				{ name: '🌍 Servers', value: `${client.guilds.cache.size}`, inline: true },
				{ name: '👨‍👩‍👧‍👦 Users', value: `${client.users.cache.size}`, inline: true },
				{ name: '💬 Text Channels', value: `${getChannelTypeSize(['GUILD_TEXT', 'GUILD_NEWS'])}`, inline: true },
				{ name: '🎤 Voice Channels', value: `${getChannelTypeSize(['GUILD_VOICE', 'GUILD_STAGE_VOICE'])}`, inline: true },
				{ name: '🧵 Threads', value: `${getChannelTypeSize(['GUILD_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_PRIVATE_THREAD'])}`, inline: true }
			)
			.setFooter({ text: 'Last Checked' })
			.setTimestamp();
		interaction.reply({ embeds: [embed], ephemeral: true });
	}
};