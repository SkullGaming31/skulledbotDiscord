const { Client, ChatInputCommandInteraction } = require('discord.js');
const Reply = require('../../Systems/reply');
module.exports = {
	name: 'ping',
	description: 'sends back your ping',
	category: 'Information',
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		return Reply(interaction, '⏳', `the current websocket latency is: \`${client.ws.ping} ms\``, true);
	}
};