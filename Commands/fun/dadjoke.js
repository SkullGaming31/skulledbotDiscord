const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	name: 'dadjoke',
	description: 'Responds with a dadjoke',
	permission: 'ADMINISTRATOR',
	options: [
		{
			name: 'target',
			description: 'the member you want to clear the messages for',
			type: 'USER',
			required: false
		}
	],

	/**
	* 
	* @param {CommandInteraction} interaction
	*/
	async execute(interaction) {

		

		const Target = interaction.options.getUser('target');

		if (Target) {
			await interaction.deferReply();
			const response = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					'accept': 'application/json',
					'User-Agent': 'Personal Twitch/Discord ChatBot (https://github.com/skullgaming31/skulledbotDiscord)'
				}
			}); 
			// console.log(response.data.joke); 
			const targetDadJokeEmbed = new MessageEmbed()
				.setTitle('DadJoke')
				.setDescription(`${response.data.joke}`)
				.setAuthor({ name: `${Target.tag}`, iconURL: `${Target.displayAvatarURL({ dynamic: true})}` })
				.setThumbnail(interaction.user.displayAvatarURL())
				.setColor('GREEN')
				.setTimestamp();
			interaction.editReply({ embeds: [targetDadJokeEmbed] });
		} else {
			await interaction.deferReply();
			const response = await axios.get('https://icanhazdadjoke.com/', {
				headers: {
					'accept': 'application/json',
					'User-Agent': 'Personal Twitch/Discord ChatBot (https://github.com/skullgaming31/skulledbotDiscord)'
				}
			}); 
			const dadJokeEmbed = new MessageEmbed()
				.setTitle('DadJoke')
				.setDescription(`${response.data.joke}`)
				.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
				.setThumbnail(interaction.user.displayAvatarURL())
				.setColor('GREEN')
				.setTimestamp();
			interaction.editReply({ embeds: [dadJokeEmbed] });
		}
	},
};