const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, } = require('discord.js');
const DB = require('../../Structures/Schemas/settingsDB');

module.exports = {
	name: 'settings',
	description: 'guild settings for some channels',
	permission: 'MANAGE_GUILD',
	options: [
		{
			name: 'logging',
			description: 'Select the logging channel',
			type: 'CHANNEL',
			required: true,
			channelTypes: ['GUILD_TEXT'],
		},
		{
			name: 'admin',
			description: 'Select your administrator role',
			type: 'ROLE',
			required: true,
		},
		{
			name: 'moderator',
			description: 'Select your moderator role',
			type: 'ROLE',
			required: true,
		},
		{
			name: 'nowlive',
			description: 'Select the Now Live channel',
			type: 'CHANNEL',
			required: false,
			channelType: ['GUILD_TEXT'],
		},
		{
			name: 'oesupport',
			description: 'Support Channel For Overlay Expert',
			type: 'CHANNEL',
			channelType: ['GUILD_TEXT']
		},
		{
			name: 'suggestions',
			description: 'Choose your suggestion channel for all suggestions to be posted too',
			type: 'CHANNEL',
			channelType: ['GUILD_TEXT'],
			required: false
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, options } = interaction;

		try {
			const Logging = options.getChannel('logging');
			const NowLive = options.getChannel('nowlive');
			const OESupport = options.getChannel('oesupport');
			const Suggestions = options.getChannel('suggestions');

			const Administrator = options.getRole('admin');
			const Moderator = options.getRole('moderator');

			await DB.findOneAndUpdate(
				{ GuildID: guild.id },
				{
					LoggingChannel: Logging.id,
					PromotionChannel: NowLive.id,
					OESupportChannel: OESupport.id,
					AdministratorRole: Administrator.id,
					ModeratorRole: Moderator.id,
					SuggestionsChannel: Suggestions.id
				},
				{
					new: true,
					upsert: true,
				}
			);

			interaction.reply({ content: 'added and/or Updated the database', ephemeral: true });
		} catch (error) {
			console.error(error);
		}
	},
};
