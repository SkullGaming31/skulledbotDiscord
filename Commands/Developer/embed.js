const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'embed',
	description: 'send an embed with your desired information',
	permission: 'ADMINISTRATOR',
	options: [
		{
			name: 'title',
			description: 'the title of your embed',
			type: 'STRING',
			required: true
		},
		{
			name: 'des',
			description: 'The Main Content of the embed',
			type: 'STRING',
			required: true
		},
		{
			name: 'color',
			description: 'What color would you like the embed',
			type: 'STRING',
			choices: [
				{
					name: 'Red',
					value: 'RED'
				},
				{
					name: 'Dark_Red',
					value: 'DARK_RED'
				},
				{
					name: 'Blue',
					value: 'BLUE'
				},
				{
					name: 'Green',
					value: 'GREEN'
				}
			],
			required: false
		},
		{
			name: 'footer',
			description: 'This will appear at the bottom of the embed',
			type: 'STRING',
			required: false
		}
	],
	/**
 * @param {CommandInteraction} interaction 
 */
	async execute(interaction) {
		const { guild, user, options } = interaction;

		const Title = options.getString('title');
		const Color = options.getString('color');
		const Footer = options.getString('footer');
		const DES = options.getString('des'); // description for the embed

		const embed = new MessageEmbed()
			.setTitle(Title)
			.setAuthor({ name: `${user.tag}`/* , iconURL: `${user.avatarURL({ dynamic: true })}` */ })
			.setDescription(`${DES}`)
			.setColor(Color)
			.setThumbnail(`${guild.iconURL({ dynamic: true}) || null}`)
			.setFooter({ text: `${Footer || guild.name}`, iconURL: `${guild.iconURL({ dynamic: true })}` })
			.setTimestamp();
		try {
			// interaction.deferReply();
			// console.log('this command is registered');
			interaction.reply({ content: 'Command Under Testing Phase', embeds: [embed] });
		} catch (error) { console.error(error); }
	}
};