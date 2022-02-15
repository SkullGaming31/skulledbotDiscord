const { ButtonInteraction, MessageEmbed, Permissions, PermissionOverwrites } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const db = require('../../Structures/Schemas/Ticket');
const config = require('../../Structures/config');

module.exports = {
	name: 'interactionCreate',
	Permission: 'ADMINISTRATOR',
	/**
   * @param {ButtonInteraction} interaction 
   */
	async execute(interaction) {
		if (!interaction.isButton()) return;
		const { guild, customId, channel, member } = interaction;
		if (!member.permissions.has('MANAGE_MESSAGE')) return interaction.reply({ content: 'the buttons are for admins/moderators only', ephemeral: true });
		if(!['close','lock','unlock','claim'].includes(customId)) return;
		
		const embed = new MessageEmbed().setColor('BLUE');
		
		try {
			db.findOne({ ChannelID: channel.id }, async(err, docs) => {
				if (err) throw err;
				if (!docs) interaction.reply({ content: 'no data was found related to this ticket, please delete it manually', ephemeral: true });
				switch(customId) {
				case 'lock':
					if (docs.locked == true) return interaction.reply({ content: 'this ticket is already closed', ephemeral: true });
					await db.updateOne({ChannelID: channel.id }, { Locked: true });
					embed.setDescription('🔒 | this channel is now locked for review');
					channel.permissionOverwrites.edit(docs.MembersID, {
						SEND_MESSAGES: false,
					}).then(channel => console.log(channel.permissionOverwrites.cache.get(member.id)))
						.catch(console.error);
					return interaction.reply({ embeds: [embed] });
				case 'unlock':
					if (docs.locked == false) return interaction.reply({ content: 'this ticket is already unlocked', ephemeral: true });
					await db.updateOne({ChannelID: channel.id }, { Locked: false });
					embed.setDescription('🔓 | this channel has been unlocked');
					channel.permissionOverwrites.edit(docs.MembersID, {
						SEND_MESSAGES: true,
					}).then(channel => console.log(channel.permissionOverwrites.cache.get(member.id))).catch(console.error);
					return interaction.reply({ embeds: [embed] });
				case 'close':
					if (docs.Closed) return interaction.reply({ content: 'Ticket is already closed, please wait for it to be automatically deleted', ephemeral: true });
					const attachments = await discordTranscripts.createTranscript(channel, {
						limit: -1,
						returnBuffer: false,
						fileName: `${docs.Type} - ${docs.TicketID}.html`,
					});
					await db.updateOne({ ChannelID: channel.id }, { Closed: true });
					interaction.reply({ content: 'The channel will delete in 10 seconds.' });
					const MEMBER = guild.members.cache.get(docs.MembersID);
					const Message = await guild.channels.cache.get(config.DISCORD_TRANSCRIPT_ID).send({ embeds: [ embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`)], files: [attachments] });
					interaction.editReply({ embeds: [embed.setDescription(`the transcript is now saved [TRANSCRIPT](${Message.url})`)] });
	
					setTimeout(() => {
						channel.delete();
					}, 10 * 1000);
	
					await db.deleteOne({ ChannelID: channel.id });
					break;
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
};