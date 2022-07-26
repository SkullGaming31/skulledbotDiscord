const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, ChannelType } = require('discord.js');
const db = require('../../Structures/Schemas/Ticket');
const TicketSetupData = require('../../Structures/Schemas/TicketSetup');
const Reply = require('../../Systems/reply');

module.exports = {
	name: 'interactionCreate',

	/**
	 * @param {ButtonInteraction} interaction
	 */

	async execute(interaction) {
		if (!interaction.isButton) return;
		const { guild, member, customId } = interaction;

		const Data = await TicketSetupData.findOne({ GuildID: guild.id });
		if (!Data) return;

		if (!Data.Buttons.includes(customId)) return;

		const ID = Math.floor(Math.random() * 90000) + 10000;

		try {
			if (guild.available)
				await guild.channels
					.create({
						name: `${customId + '-' + ID}`,
						reason: 'Ticket System',
						type: ChannelType.GuildText,
						parent: Data.Category,
						permissionOverwrites: [
							{
								id: member.id,
								allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory', 'AttachFiles', 'EmbedLinks'],
							},
							{
								id: Data.Everyone,
								deny: ['ViewChannel'],
							},
							{
								id: Data.BotRole,
								allow: ['ViewChannel', 'SendMessages'],
							}
						],
					})
					.then(async (channel) => {
						await db.create({
							GuildID: guild.id,
							MembersID: member.id,
							TicketID: ID,
							ChannelID: channel.id,
							Closed: false,
							Locked: false,
							Type: customId,
							Claimed: false,
						});
						const embed = new EmbedBuilder()
							.setAuthor({ name: `${guild.name} | Ticket: ${ID}` })
							.setDescription('Please wait patiently for a response from the staff team, in the mean time, please Describe your issue in as much detail as possible')
							.setColor(Colors.Blue)
							.setFooter({ text: 'the buttons below are staff only buttons' });

						const Buttons = new ActionRowBuilder();
						Buttons.addComponents(
							new ButtonBuilder()
								.setCustomId('close')
								.setLabel('Save And Close Ticket')
								.setStyle(ButtonStyle.Primary)
								.setEmoji('💾'),
							new ButtonBuilder()
								.setCustomId('lock')
								.setLabel('Lock')
								.setStyle(ButtonStyle.Danger)
								.setEmoji('🔒'),
							new ButtonBuilder()
								.setCustomId('unlock')
								.setLabel('Unlock')
								.setStyle(ButtonStyle.Success)
								.setEmoji('🔓'),
							new ButtonBuilder()
								.setCustomId('claim')
								.setLabel('Claim')
								.setStyle(ButtonStyle.Secondary)
								.setEmoji('🛄')
						);
						channel.send({ content: `<@&${Data.Handlers}>`, embeds: [embed], components: [Buttons], });
						await channel.send({ content: `${member} here is your ticket` }).then((m) => {
							setTimeout(() => {
								m.delete().catch((err) => { console.error(err); });
							}, 5000); // 1000ms = 1 second
						}).catch((err) => { console.error(err); });
						// interaction.reply({ content: `${member} your ticket has been created: ${channel}`, ephemeral: true, });
						await Reply(interaction, '✔', `${member} your ticket has been created: ${channel}`, true);
					});
		} catch (error) {
			console.error(error);
		}
	},
};
