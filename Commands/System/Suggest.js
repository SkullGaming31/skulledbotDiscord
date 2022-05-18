const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DB = require('../../Structures/Schemas/suggestDB');

module.exports = {
	name: 'suggest',
	description: 'give me a suggestion on how i could improve the discord or my twitch channel',
	permission: 'SEND_MESSAGES',
	options: [
		{
			name: 'type',
			description: 'select the type',
			type: 'STRING',
			required: true,
			choices: [
				{ name: 'Discord', value: 'Discord' },
				{ name: 'Twitch', value: 'Twitch' }
			]
		},
		{
			name: 'suggestion',
			description: 'describe your suggestion',
			type: 'STRING',
			required: true
		}
	],

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, guildId, guild, member, user } = interaction;

		const Type = options.getString('type');
		const Suggestion = options.getString('suggestion');

		const suggestionChannel = guild.channels.cache.get('835420636750938114');

		const Response = new MessageEmbed()
			.setColor('NAVY')
			.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
			.addFields(
				{ name: 'Suggestion: ', value: Suggestion, inline: false },
				{ name: 'Type: ', value: Type, inline: true },
				{ name: 'Status: ', value: 'Pending..', inline: true }
			).setTimestamp();

		const Buttons = new MessageActionRow();
		Buttons.addComponents(
			new MessageButton().setCustomId('sugges-accept').setLabel('✅ Accept').setStyle('SUCCESS'),
			new MessageButton().setCustomId('sugges-decline').setLabel('⛔ Decline').setStyle('DANGER')
		);

		try {
			interaction.reply({ content: 'Thank you for your suggestion', ephemeral: true });
			const M = await suggestionChannel.send({ embeds: [Response], components: [Buttons], fetchReply: true });
			await DB.create({
				GuildID: guildId, MessageID: M.id, Details: [
					{
						MemberID: member.id,
						Type: Type,
						Suggestion: Suggestion
					}
				]
			});
		} catch (error) {
			console.log(error);
		}
	}
};