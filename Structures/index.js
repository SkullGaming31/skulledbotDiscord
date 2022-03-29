const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const { promisify } = require('util');
const glob = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const config = require('./config');

const client = new Client({ intents: [ 
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_MEMBERS 
] 
});

client.commands = new Collection();
['Events', 'Commands'].forEach(handler => {
	require(`../handlers/${handler}`)(client, PG, Ascii);
});


client.login(config.DISCORD_BOT_TOKEN);