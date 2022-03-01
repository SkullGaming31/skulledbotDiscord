const { CommandInteraction } = require('discord.js');
// const fetch = require('node-fetch');
const axios = require('axios').default;

module.exports = {
	name: 'dog',
	description: 'Sends a random picture of a dog',
	permission: 'ADMINISTRATOR',

	/**
	* 
	* @param {CommandInteraction} interaction
	*/
	async execute(interaction) {
		const { data: { message }} = await axios.get('https://dog.ceo/api/breeds/image/random', {
			headers: {
				'accept': 'application/json'
			}
		});
		await interaction.deferReply();
		interaction.editReply({ files: [message] });
	},
};