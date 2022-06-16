const { MessageEmbed, ButtonInteraction, Client, Modal, TextInputComponent } = require('discord.js');

module.exports = {
	id: 'Answer',

	/**
	 * 
	 * @param {ButtonInteraction} interaction 
	 */
	async execute(interaction) {
		const modal = new Modal()
			.setCustomId('submit-modal')
			.setTitle('Age Selector')
			.addComponents(
				new TextInputComponent()
					.setCustomId('submit-modal')
					.setLabel('Submit your Age')
					.setStyle('SHORT')
					.setMinLength(1)
					.setMaxLength(2)
					.setPlaceholder('Provide your age')
					.setRequired(true)
			);
	}
}