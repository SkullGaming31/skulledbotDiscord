const { ChatInputCommandInteraction, EmbedBuilder, Colors, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: 'clear',
	description: 'Clears Messages from the channel',
	UserPerms: ['ManageMessages'],
	BotPerms: ['ManageMessages'],
	options: [
		{
			name: 'amount',
			description: 'the ammount of messages you wanna clear from the channel',
			type: ApplicationCommandOptionType.Number,
			required: true
		},
		{
			name: 'target',
			description: 'the member you want to clear the messages for',
			type: ApplicationCommandOptionType.User,
			required: false
		}
	],
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { channel, options } = interaction;

		const Amount = options.getNumber('amount');
		const Target = options.getMember('target');

		const Messages = await channel.messages.fetch();

		const response = new EmbedBuilder().setColor(Colors.NotQuiteBlack);

		if (Target) {
			let i = 0;
			const filtered = [];
			(await Messages).filter((m) => {
				if (m.author.id === Target.id && Amount > i) {
					filtered.push(m);
					i++;
				}
			});
			await channel.bulkDelete(filtered, true).then(messages => {
				response.setDescription(`🧹 ${interaction.user.username} Cleared ${messages.size} messages from ${Target}`)
					.setColor(Colors.Red);
				interaction.reply({ embeds: [response] });
			});
		} else {
			await channel.bulkDelete(Amount, true).then(messages => {
				response.setDescription(`🧹 ${interaction.user.username} Cleared ${messages.size} messages from the channel`)
					.setColor(Colors.Red);
				interaction.reply({ embeds: [response] });
			});
		}
	}
};