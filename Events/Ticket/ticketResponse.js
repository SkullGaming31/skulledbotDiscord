const { ButtonInteraction, MessageEmbed } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const DB = require('../../Structures/Schemas/Ticket');
const TicketSetupData = require('../../Structures/Schemas/TicketSetup');

module.exports = {
	name: 'interactionCreate',
	Permission: 'MANAGE_CHANNELS',
	/**
	 * @param {ButtonInteraction} interaction
	 */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		const { guild, customId, channel, member } = interaction;
		if (!['close', 'lock', 'unlock', 'claim'].includes(customId)) return;

		const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
		if (!TicketSetup)
			return interaction.reply({ content: 'the data for this system is outdated' });
		if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
			return interaction.reply({ content: `you must have the <@&${TicketSetup.Handlers}> role to interact with these buttons`, ephemeral: true });

		const embed = new MessageEmbed().setColor('BLUE');

		DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
			if (err) throw err;
			if (!docs)
				return interaction.reply({ content: 'no data was found related to this ticket, please delete it manually', ephemeral: true });
			switch (customId) {
				case 'lock':
					if (docs.locked == true)
						return interaction.reply({ content: 'this ticket is already Locked', ephemeral: true });
					await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
					embed.setDescription('🔒 | this channel is now locked Pending Review');

					docs.MembersID.forEach((m) => {
						channel.permissionOverwrites.edit(m, {
							SEND_MESSAGES: false,
							EMBED_LINKS: false,
							ATTACH_FILES: false,
						});
					});
					interaction.reply({ embeds: [embed] });
					break;
				case 'unlock':
					if (docs.locked == false)
						return interaction.reply({ content: 'this ticket is already unlocked', ephemeral: true });
					await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
					embed.setDescription('🔓 | this channel has been unlocked');
					docs.MembersID.forEach((m) => {
						channel.permissionOverwrites.edit(m, {
							SEND_MESSAGES: true,
							EMBED_LINKS: true,
							ATTACH_FILES: true,
						});
					});
					interaction.reply({ embeds: [embed] });
					break;
				case 'close':
					if (docs.Closed)
						return interaction.reply({ content: 'Ticket is already closed, please wait for it to be automatically deleted', ephemeral: true });
					const attachments = await discordTranscripts.createTranscript(
						channel,
						{
							limit: -1,
							returnBuffer: false,
							fileName: `${docs.Type} - ${docs.TicketID}.html`,
						}
					);
					await DB.updateOne({ ChannelID: channel.id }, { Closed: true });
					const Message = await guild.channels.cache.get(TicketSetup.Transcripts)
						.send({ embeds: [embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`)], files: [attachments] });
					await interaction.editReply({ content: 'The channel will deleted in 10 seconds.', embeds: [embed.setDescription(`the transcript is now saved [TRANSCRIPT](${Message.url})`),], });
					setTimeout(() => {
						channel.delete();
					}, 15 * 1000);

					await DB.deleteOne({ ChannelID: channel.id });
					break;
				case 'claim':
					if (docs.Claimed == true)
						return interaction.reply({ content: `this ticket has already been claimed by <@${docs.ClaimedBy}>`, ephemeral: true });
					await DB.updateOne({ ChannelID: channel.id }, { Claimed: true, ClaimedBy: member.id });

					embed.setDescription(`🛄 | this ticket is now claimed by ${member}`);
					interaction.reply({ embeds: [embed] });
					break;
			}
		});
	},
};
