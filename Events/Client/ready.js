const { Client, ActivityType } = require('discord.js');
const { MONGO_URL } = require('../../Structures/config');
const mongoose = require('mongoose');
const ms = require('ms');
module.exports = {
	name: 'ready',
	once: true,
	/**
 * 
 * @param {Client} client 
 */
	async execute(client) {
		const { user, ws } = client;
		console.log(`${client.user.tag} is online!`);

		setInterval(() => {
			const ping = ws.ping;
			user.setActivity({
				name: `Ping: ${ping}ms`,
				type: ActivityType.Watching
			});
		}, ms('20s'));

		if (!MONGO_URL) return;
		mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => { console.log('Connected to the Database'); })
			.catch((err) => console.log(err));
	}
};