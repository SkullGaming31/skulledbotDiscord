const { Client } = require('discord.js');
// const mongoose = require('mongoose');
// const { MONGO_DATABASE } = require('../../Structures/config');

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client 
	 */
	execute (client) {
		console.log(`Logged in as ${client.user.tag}`);
		client.user.setActivity('JavaScript', { type: 'WATCHING' });
		// client.guilds.cache.get('797740303176040498').commands.set([]); // remove ALL commands

		// if (!MONGO_DATABASE) return;
		// mongoose.connect(MONGO_DATABASE, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true
		// }).then(() => {
		// 	console.log('the client is now connected to the database');
		// }).catch((err) => {
		// 	console.error(err);
		// });
	},
};