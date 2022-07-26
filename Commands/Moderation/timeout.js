const { ChatInputCommandInteraction, EmbedBuilder, Colors, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'timeout',
	description: 'Timeout a user from sending messages or joining a voice channel',
	UserPerms: ['ModerateMembers'],
	BotPerms: ['ModerateMembers'],
	options: [
		{
			name: 'target',
			description: 'the user you want to timeout',
			type: ApplicationCommandOptionType.User,
			required: true
		},
		{
			name: 'length',
			description: 'how long do you want to timeout the user',
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: 'reason',
			description: 'reason for timing out the user',
			type: ApplicationCommandOptionType.String
		}
	],
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { channel, options } = interaction;

		const Target = options.getMember('target');
		const Length = options.getString('length');
		let reason = options.getString('reason');

		const timeInMs = ms(Length) / 1000;

		try {
			// await interaction.deferReply();
			if (!timeInMs) return interaction.reply({ content: 'Please specify a valid time' });
			if (!reason) reason = 'No Reason Provided';

			const timedoutEmbed = new EmbedBuilder()
				.setTitle(`${Target.displayName}`)
				.addFields({ name: 'Timed Out for: ', value: `\`${timeInMs}\``, inline: true })
				.addFields({ name: 'Reason: ', value: `\`${reason}\``, inline: true })
				.setColor(Colors.Red);
			interaction.reply({ embeds: [timedoutEmbed] });
			Target.timeout(timeInMs, reason);
		} catch (error) {
			console.error(error);
		}
	}
};