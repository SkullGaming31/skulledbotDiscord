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
		const { user, guilds } = client;
		console.log(`${user.tag} is online!`);
		user.setActivity({ name: ` over ${guilds.cache.size} Guilds`, type: ActivityType.Watching });


		if (!MONGO_URL) return;
		mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => { console.log('Connected to the Database'); })
			.catch((err) => console.log(err));
	}
};