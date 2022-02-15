const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
	name: 'ticketsetup',
	description: 'Initial Ticket Setup',
	permission: 'ADMINISTRATOR',
	/**
 * 
 * @param {CommandInteraction} interaction 
 */
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor({ name: `${interaction.guild.name} | Ticket System`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
			.setDescription('Open a ticket to discuss any of the issues listed on the buttons')
			.setThumbnail(interaction.guild.iconURL());
		const Buttons = new MessageActionRow();
		Buttons.addComponents(
			new MessageButton().setCustomId('player').setLabel('Member Report').setStyle('PRIMARY').setEmoji('🧧'),
			new MessageButton().setCustomId('bug').setLabel('Bug Report').setStyle('SECONDARY').setEmoji('🐛'),
			new MessageButton().setCustomId('support').setLabel('Support').setStyle('SUCCESS').setEmoji('✅')
		);
		await interaction.channel.send({ embeds: [embed], components: [Buttons] });
		interaction.reply({ content: 'done', ephemeral: true });
	}
};