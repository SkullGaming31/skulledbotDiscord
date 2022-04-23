const { CommandInteraction } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	name: 'cat',
	description: 'Sends a random picture of a cat',
	permission: 'SEND_MESSAGES',

	/**
	* @param {CommandInteraction} interaction
	*/
	async execute(interaction) {
		const { data: { file }} = await axios.get('https://aws.random.cat/meow', {
			headers: {
				'accept': 'application/json',
				'User-Agent': 'Personal Twitch/Discord ChatBot (https://github.com/skullgaming31/skulledbot)'
			}
		});
		interaction.reply({ files: [file] });
	},
};