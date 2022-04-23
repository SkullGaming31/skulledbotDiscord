const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton, } = require('discord.js');
const db = require('../../Structures/Schemas/Ticket');
const TicketSetupData = require('../../Structures/Schemas/TicketSetup');

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
		interaction.deferReply({ ephemeral: true });

		try {
			if (guild.available)
				await guild.channels
					.create(`${customId + '-' + ID}`, {
						type: 'GUILD_TEXT',
						parent: Data.Category,
						permissionOverwrites: [
							{
								id: member.id,
								allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS'],
							},
							{
								id: Data.Everyone,
								deny: ['VIEW_CHANNEL'],
							},
							{
								id: Data.BotRole,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
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
						const embed = new MessageEmbed()
							.setAuthor({ name: `${guild.name} | Ticket: ${ID}` })
							.setDescription('Please wait patiently for a response from the staff team, in the mean time, please Describe your issue in as much detail as possible')
							.setColor('BLUE')
							.setFooter({ text: 'the buttons below are staff only buttons' });

						const Buttons = new MessageActionRow();
						Buttons.addComponents(
							new MessageButton()
								.setCustomId('close')
								.setLabel('Save And Close Ticket')
								.setStyle('PRIMARY')
								.setEmoji('💾'),
							new MessageButton()
								.setCustomId('lock')
								.setLabel('Lock')
								.setStyle('DANGER')
								.setEmoji('🔒'),
							new MessageButton()
								.setCustomId('unlock')
								.setLabel('Unlock')
								.setStyle('SUCCESS')
								.setEmoji('🔓'),
							new MessageButton()
								.setCustomId('claim')
								.setLabel('Claim')
								.setStyle('PRIMARY')
								.setEmoji('🛄')
						);
						channel.send({ content: `<@&${Data.Handlers}>`, embeds: [embed], components: [Buttons], });
						await channel.send({ content: `${member} here is your ticket` }).then((m) => {
							setTimeout(() => {
								m.delete().catch((err) => { console.error(err); });
							}, 5000);
						}).catch((err) => { console.error(err); });
						await interaction.editReply({ content: `${member} your ticket has been created: ${channel}` });
					});
		} catch (error) {
			console.error(error);
		}
	},
};
