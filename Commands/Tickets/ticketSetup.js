const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ChannelType, ButtonStyle, Colors } = require('discord.js');
const DB = require('../../Structures/Schemas/TicketSetup');

module.exports = {
	name: 'ticketsetup',
	description: 'Initial Ticket Setup',
	UserPerms: ['ManageChannels'],
	BotPerms: ['ManageChannels'],
	options: [
		{
			name: 'channel',
			description: 'Select the Ticket creation channel',
			type: ApplicationCommandOptionType.Channel,
			required: true,
			channelTypes: [ChannelType.GuildText],
		},
		{
			name: 'category',
			description: 'Select the channel category where tickets will be created',
			type: ApplicationCommandOptionType.Channel,
			required: true,
			channelTypes: [ChannelType.GuildCategory],
		},
		/* {
			name: 'transcripts',
			description: 'Select the transcripts channel.',
			type: ApplicationCommandOptionType.Channel,
			required: true,
			channelType: [ChannelType.GuildText],
		}, */
		{
			name: 'handlers',
			description: 'Select the role that will handle tickets',
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
		{
			name: 'everyone',
			description: 'Provide the @everyone Role, Its Important',
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
		{
			name: 'botrole',
			description: 'Provide your bots role',
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
		{
			name: 'description',
			description: 'Set the description of the ticket embed',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: 'firstbutton',
			description: 'give your first button a name followed by a comma then the emoji',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: 'secondbutton',
			description: 'give your second button a name followed by a comma then the emoji',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: 'thirdbutton',
			description: 'give your third button a name followed by a comma then the emoji',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, options } = interaction;

		try {
			const Channel = options.getChannel('channel');
			const Category = options.getChannel('category');
			const Transcripts = options.getChannel('transcripts');

			const Handlers = options.getRole('handlers');
			const Everyone = options.getRole('everyone');
			const BotRole = options.getRole('botrole');

			const Description = options.getString('description');

			const FirstButton = options.getString('firstbutton').split(',');
			const SecondButton = options.getString('secondbutton').split(',');
			const ThirdButton = options.getString('thirdbutton').split(',');

			const FirstEmoji = FirstButton[1];
			const SecondEmoji = SecondButton[1];
			const ThirdEmoji = ThirdButton[1];

			await DB.findOneAndUpdate(
				{ GuildID: guild.id },
				{
					Channel: Channel.id,
					Category: Category.id,
					// Transcripts: Transcripts.id,
					Handlers: Handlers.id,
					Everyone: Everyone.id,
					BotRole: BotRole.id,
					Description: Description,
					Buttons: [FirstButton[0], SecondButton[0], ThirdButton[0]],
				},
				{
					new: true,
					upsert: true,
				}
			);

			const Buttons = new ActionRowBuilder();
			Buttons.addComponents(
				new ButtonBuilder()
					.setCustomId(FirstButton[0])
					.setLabel(FirstButton[0])
					.setStyle(ButtonStyle.Primary)
					.setEmoji(FirstEmoji),
				new ButtonBuilder()
					.setCustomId(SecondButton[0])
					.setLabel(SecondButton[0])
					.setStyle(ButtonStyle.Success)
					.setEmoji(SecondEmoji),
				new ButtonBuilder()
					.setCustomId(ThirdButton[0])
					.setLabel(ThirdButton[0])
					.setStyle(ButtonStyle.Danger)
					.setEmoji(ThirdEmoji)
			);
			const embed = new EmbedBuilder()
				.setColor(Colors.Red)
				.setAuthor({ name: `${guild.name} | Ticket System`, iconURL: guild.iconURL({ dynamic: true }) })
				.setDescription(Description);

			await guild.channels.cache.get(Channel.id).send({ embeds: [embed], components: [Buttons] });

			interaction.reply({ content: 'done', ephemeral: true });
		} catch (error) {
			const errEmbed = new EmbedBuilder().setColor(Colors.Red)
				.setDescription(`⛔ | An Error occured while setting up your ticket system\n **What to make sure of?**
			1. Make sure none of your buttons names are duplacated.
			2. Make sure to use this format for your buttons => Name,Emoji.
			3. Make sure your button names do not exceed 200 characters.
			4. Make sure your button emojis are actually emojis, not ids.`);
			console.error(error);
			interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}
	},
};