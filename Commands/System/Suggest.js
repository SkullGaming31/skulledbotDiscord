const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors, ButtonStyle, ApplicationCommandOptionType } = require('discord.js');
const DB = require('../../Structures/Schemas/SuggestDB');
const Reply = require('../../Systems/reply');

module.exports = {
	name: 'suggest',
	description: 'give me a suggestion on how i could improve the discord or my twitch channel',
	UserPerms: ['SendMessages'],
	BotPerms: ['SendMessages'],
	options: [
		{
			name: 'title',
			description: 'give your suggestion a title',
			type: ApplicationCommandOptionType.String,
			required: true
		},
		{
			name: 'suggestion',
			description: 'describe your suggestion',
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, guildId, guild, member, user } = interaction;

		const Title = options.getString('title');
		const Suggestion = options.getString('suggestion');

		const suggestionChannel = guild.channels.cache.get('835420636750938114');// suggestions channel

		const Response = new EmbedBuilder()
			.setColor(Colors.Blue)
			.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
			.addFields(
				{ name: 'Suggestion: ', value: Suggestion, inline: false },
				{ name: 'Type: ', value: Title, inline: true },
				{ name: 'Status: ', value: 'Pending..', inline: true }
			).setTimestamp();

		const Buttons = new ActionRowBuilder();
		Buttons.addComponents(
			new ButtonBuilder().setCustomId('sugges-accept').setLabel('✅ Accept').setStyle(ButtonStyle.Primary),
			new ButtonBuilder().setCustomId('sugges-decline').setLabel('⛔ Decline').setStyle(ButtonStyle.Danger)
		);

		try {
			// interaction.reply({ content: 'Thank you for your suggestion', ephemeral: true });
			Reply(interaction, '♥', 'Thank you for your suggestion', true);
			const M = await suggestionChannel.send({ embeds: [Response], components: [Buttons], fetchReply: true });
			await DB.create({
				GuildID: guildId, MessageID: M.id,
				Details: [
					{
						MemberID: member.id,
						Type: Title,
						Suggestion: Suggestion
					}
				]
			});
		} catch (error) {
			console.log(error);
		}
	}
};