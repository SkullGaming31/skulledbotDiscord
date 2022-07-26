const { ChatInputCommandInteraction, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const DB = require('../../Structures/Schemas/settingsDB');

module.exports = {
	name: 'settings',
	description: 'guild settings for some channels',
	UserPerms: ['ManageGuild'],
	BotPerms: ['ManageGuild'],
	options: [
		{
			name: 'logging',
			description: 'Select the logging channel',
			type: ApplicationCommandOptionType.Channel,
			required: true,
			channelTypes: [ChannelType.GuildText]
		},
		{
			name: 'admin',
			description: 'Select your administrator role',
			type: ApplicationCommandOptionType.Role,
			required: true
		},
		{
			name: 'moderator',
			description: 'Select your moderator role',
			type: ApplicationCommandOptionType.Role,
			required: true
		},
		{
			name: 'nowlive',
			description: 'Select the Now Live channel',
			type: ApplicationCommandOptionType.Channel,
			required: false,
			channelType: [ChannelType.GuildText]
		},
		{
			name: 'suggestions',
			description: 'Choose your suggestion channel for all suggestions to be posted too',
			type: ApplicationCommandOptionType.Channel,
			required: false,
			channelType: [ChannelType.GuildText]
		}
	],
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, options } = interaction;

		try {
			const Logging = options.getChannel('logging');
			const NowLive = options.getChannel('nowlive');
			const Suggestion = options.getChannel('suggestions');

			const Administrator = options.getRole('admin');
			const Moderator = options.getRole('moderator');


			await DB.findOneAndUpdate(
				{ GuildID: guild.id },
				{
					LoggingChannel: Logging.id,
					PromotionChannel: NowLive.id,
					SuggestionsChannel: Suggestion.id,
					AdministratorRole: Administrator.id,
					ModeratorRole: Moderator.id
				},
				{
					new: true,
					upsert: true
				}
			);

			interaction.reply({ content: 'Added and/or Updated the database', ephemeral: true });
		} catch (error) {
			console.error(error);
		}
	},
};