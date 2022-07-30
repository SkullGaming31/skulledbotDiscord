/* eslint-disable indent */
const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
	name: 'emit',
	description: 'Emit an Event for testing',
	category: 'Developer',
	UserPerms: ['Administrator'],
	BotPerms: ['ManageGuilds'],
	options: [
		{
			name: 'member',
			description: 'Guild Member Events',
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: 'guildMemberAdd',
					value: 'guildMemberAdd',
				},
				{
					name: 'guildMemberRemove',
					value: 'guildMemberRemove'
				},
				{
					name: 'guildCreate',
					value: 'guildCreate'
				},
				{
					name: 'guildDelete',
					value: 'guildDelete'
				},
				{
					name: 'guildMemberUpdate',
					value: 'guildMemberUpdate'
				}
			]
		}
	],
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { options } = interaction;

		const choices = options.getString('member');

		switch (choices) {
			case 'guildMemberAdd':
				client.emit('guildMemberAdd', interaction.member);
				interaction.reply({ content: 'Emitted the event!', ephemeral: true });
				break;
			case 'guildMemberRemove':
				client.emit('guildMemberRemove', interaction.member);
				interaction.reply({ content: 'Emitted the event!', ephemeral: true });
				break;
			case 'guildCreate':
				client.emit('guildCreate', interaction.guild);
				interaction.reply({ content: 'Emitted The Event', ephemeral: true });
				break;
			case 'guildDelete':
				client.emit('guildDelete', interaction.guild);
				interaction.reply({ content: 'Emitted the event', ephemeral: true });
				break;
			case 'guildMemberUpdate':
				client.emit('guildMemberUpdate', interaction.member);
				interaction.reply({ content: 'Emitted the event', ephemeral: true });
				break;
		}
	}
};