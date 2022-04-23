const { MessageEmbed, CommandInteraction } = require('discord.js');
const DB = require('../../Structures/Schemas/Ticket');

module.exports = {
	name: 'ticket',
	description: 'Ticket Actions',
	permission: 'MANAGE_MESSAGES',
	options: [
		{
			name: 'action',
			description: 'add or remove a member from the ticket',
			type: 'STRING',
			required: true,
			choices: [
				{
					name: 'Add',
					value: 'add'
				},
				{
					name: 'Remove',
					value: 'remove'
				}
			]
		},
		{
			name: 'member',
			description: 'add a member to the ticket',
			type: 'USER',
			required: true
		}
	],
	/**
   * @param {CommandInteraction} interaction 
   */
	async execute(interaction) {
		const { guildId, options, channel  } = interaction;

		const Action = options.getString('action');
		const Member = options.getMember('member');

		const embed = new MessageEmbed();

		switch(Action) {
		case 'add':
			DB.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
				if (err) throw err;
				if (!docs) return interaction.reply({ embeds: [embed.setColor('RED').setDescription('⛔ | this channel is not tied with a ticket')], ephemeral: true });
				if (docs.MembersID.includes(Member.id)) return interaction.reply({ embeds: [embed.setColor('RED').setDescription('⛔ | this member is already added to this ticket')], ephemeral: true });
				docs.MembersID.push(Member.id);
				channel.permissionOverwrites.edit(Member.id, {
					SEND_MESSAGES: true,
					VIEW_CHANNEL: true,
					READ_MESSAGE_HISTORY: true,
					ATTACH_FILES: true
				});
				interaction.reply({ content: `${Member}`, embeds: [embed.setColor('GREEN').setDescription(`✅ | ${Member} has been added to the ticket`)] });
				docs.save();
			});
			break;
		case 'remove':
			DB.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
				if (err) throw err;
				if (!docs) return interaction.reply({ embeds: [embed.setColor('RED').setDescription('⛔ | this channel is not tied with a ticket')], ephemeral: true });
				if (!docs.MembersID.includes(Member.id)) return interaction.reply({ embeds: [embed.setColor('RED').setDescription('⛔ | this member is not in this ticket')], ephemeral: true });
				docs.MembersID.remove(Member.id);
				channel.permissionOverwrites.edit(Member.id, {
					VIEW_CHANNEL: false,
				});
				interaction.reply({ embeds: [embed.setColor('GREEN').setDescription(`✅ | ${Member} has been removed from the ticket`)] });
				docs.save();
			});
			break;
		}
	}
};