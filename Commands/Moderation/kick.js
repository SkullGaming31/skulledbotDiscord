/* eslint-disable indent */
const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const ms = require('ms');
const EditReply = require('../../Systems/editReply');
module.exports = {
	name: 'kick',
	description: 'Kicks a member from the guild',
	UserPerms: ['KickMembers'],
	BotPerms: ['KickMembers'],
	category: 'Moderation',
	options: [
		{
			name: 'user',
			description: 'select a member to kick from the guild',
			type: ApplicationCommandOptionType.User,
			required: true
		},
		{
			name: 'reason',
			description: 'the reason you are kicking this member',
			type: ApplicationCommandOptionType.String,
			required: false
		}
	],
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });

		const { options, user, guild } = interaction;
		const member = options.getMember('user');
		const reason = options.getString('reason') || 'No Reason Provided';
		if (member.id === user.id) return EditReply(interaction, '❌', 'You can not kick yourself from the guild');
		if (guild.ownerId === member.id) return EditReply(interaction, '❌', 'Someones on a Power Tripping Session, you cant kick the owner, the guild would be deleted.');
		if (guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, '❌', 'you cant kick a member of your level or higher');
		if (interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, '❌', 'you cant kick a member of your level or higher');

		const kickEmbed = new EmbedBuilder().setColor(Colors.Blue);
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('kick-yes').setLabel('Yes'),
			new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId('kick-no').setLabel('No')
		);
		const page = await interaction.editReply({
			embeds: [
				kickEmbed.setDescription('**⚠ | do you really wanna kick this member?**')
			],
			components: [row]
		});
		const col = await page.createMessageComponentCollector({
			componentType: ComponentType.Button,
			time: ms('15s')
		});
		col.on('collect', i => {
			if (i.user.id !== user.id) return;
			switch (i.customId) {
				case 'kick-yes':
					member.kick(reason);
					interaction.editReply({
						embeds: [
							kickEmbed.setDescription(`✔ | ${member} **has been kicked for : ${reason}**`)
						],
						components: []
					});
					member.send({
						embeds: [
							new EmbedBuilder()
								.setColor(Colors.Red)
								.addFields([
									{
										name: 'Reason',
										value: `you were kicked from ${guild} for ${reason}`,
										inline: true
									}
								])
						]
					}).catch(err => {
						if (err.code !== 50007) return console.error('Users Dm\'s are turned off', err);
					});
					break;
				case 'kick-no':
					interaction.editReply({
						embeds: [
							kickEmbed.setDescription('✅ | Kick Request Canceled')
						],
						components: []
					});
					break;
			}
		});
		col.on('end', (collected) => {
			if (collected.size > 0) return;
			interaction.editReply({
				embeds: [kickEmbed.setDescription('❌ | you did not provide a valid response in time')],
				components: []
			});
		});
	}
};