const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	name: 'cat',
	description: 'Sends a random picture of a cat',
	permission: 'ADMINISTRATOR',

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
		// console.log(file);
		await interaction.deferReply();
		interaction.editReply({ files: [file] });
	},
};