const { Client, ChatInputCommandInteraction } = require('discord.js');
const axios = require('axios').default;
const Reply = require('../../Systems/reply');
const { Octokit } = require('octokit');
const { GITHUB_PERSONAL_ACCESS_TOKEN } = require('../../Structures/config');
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
		await Reply(interaction, '⏳', `the current websocket latency is: \`${client.ws.ping} ms\``, true);
	}
};