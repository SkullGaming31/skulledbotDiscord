const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { MONGO_DATABASE } = require('../../Structures/config');

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client 
	 */
	async execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
		const tbd = await client.guilds.fetch();
		console.log(`currently in ${tbd.size} guilds!`)
		client.user.setActivity(` over ${tbd.size} guilds`, { type: 'WATCHING' });

		if (!MONGO_DATABASE) return;
		mongoose.connect(MONGO_DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => {
			console.log('the client is now connected to the database');
		}).catch((err) => {
			console.error(err);
		});
	},
};