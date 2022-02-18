const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DB = require('../../Structures/Schemas/suggestDB');

module.exports = {
	name: 'suggest',
	description: 'Create a suggestion in an orginized matter',
	permission: 'ADMINISTRATOR',
	options: [
		{
			name: 'type',
			description: 'select the type',
			type: 'STRING',
			required: true,
			choices: [
				{ name: 'Command', value: 'Command' },
				{ name: 'Event',  value: 'Event' },
				{ name: 'System', value: 'System' },
				{ name: 'Other', value: 'Other' }
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
		const { options, guildId, member, user } = interaction;

		const Type = options.getString('type');
		const Suggestion = options.getString('suggestion');
		
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
			const M = await interaction.reply({ embeds: [Response], components: [Buttons], fetchReply: true });
			await DB.create({ GuildID: guildId, MessageID: M.id, Details: [
				{
					MemberID: member.id,
					Type: Type,
					Suggestion: Suggestion
				}
			] });
		} catch (error) {
			console.log(error);
		}
	}
};