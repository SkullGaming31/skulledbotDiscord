const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionCollector, ButtonInteraction } = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'messageCreate',
	/**
	 * 
	 * @param {Message} message 
	 * @param {Client} client
	 */
	async execute(message, client) {
		const { author, guild, content } = message;
		const { user } = client;

		if (!guild || author.bot) return;
		if (content.includes('@here') || content.includes('@everyone')) return;
		if (!content.includes(user.id)) return;

		const embed = new EmbedBuilder()
			.setColor('Green')
			.setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
			.setDescription(`Hi im ${user.username}, use the button below to invite me to your server, keep in mind im still heavly in development, so there will be issues/bugs, simply report them using the 2nd button, i can be reached anytime simply by mentioning me in any text channel.`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }));

		if (process.env.NODE_ENV === 'development') {
			const row = new ActionRowBuilder().addComponents(// SkulledbotV2 Test
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL('https://discord.com/api/oauth2/authorize?client_id=930882181595807774&permissions=1426937080950&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20connections%20guilds%20bot%20applications.commands')
					.setLabel('Invite Me'),
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL('https://github.com/SkullGaming31/skulledbotDiscord/issues')
					.setLabel('Report Bugs/issues')
			);
			return message.reply({ embeds: [embed], components: [row] }).then(msg =>
				setTimeout(() => {
					msg.delete().catch((err) => {
						if (err.code !== 10008) return console.error(err);
					});
				}, ms('1m')));

		} else if (process.env.NODE_ENV === 'production') {
			const row = new ActionRowBuilder().addComponents(// SkulledbotV2
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL('https://discord.com/api/oauth2/authorize?client_id=910935752219701258&permissions=1426966441078&redirect_uri=https%3A%2F%2Fskulledbotv2.up.railway.app%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20connections%20guilds%20bot%20applications.commands')
					.setLabel('Invite Me'),
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL('https://github.com/SkullGaming31/skulledbotDiscord/issues')
					.setLabel('Report Bugs/issues')
			);
			return message.reply({ embeds: [embed], components: [row] }).then(msg =>
				setTimeout(() => {
					msg.delete().catch((err) => {
						if (err.code !== 10008) return console.error(err);
					});
				}, ms('1m')));
		}
	}
};