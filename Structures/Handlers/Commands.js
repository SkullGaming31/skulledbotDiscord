const { Perms } = require('../Validation/Permissions');
const { Client } = require('discord.js');
const ms = require('ms');

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii('Commands Loaded');

	let CommandsArray = [];

	const commandFiles = await PG(`${process.cwd()}/Commands/*/*.js`);

	commandFiles.map(async (file) => {
		const command = require(file);

		if (!command.name)
			return Table.addRow(file.split('/')[7], '🔸 FAILED', 'Missing a name');

		if (!command.context && !command.description)
			return Table.addRow(command.name, '🔸 FAILED', 'Missing a description');

		if (command.UserPerms) {
			if (command.UserPerms.every(perms => Perms.includes(perms))) command.default_member_permissions = false;
			else return Table.addRow(command.name, '🔸 FAILED', 'Permission is invalid');
		}

		client.commands.set(command.name, command);
		CommandsArray.push(command);

		await Table.addRow(command.name, '🔹 SUCCESSFUL');
	});
	console.log(Table.toString());

	// Enabling Commands for all Guilds //
	client.on('ready', async () => {
		client.guilds.cache.forEach((g) =>
			g.commands.set(CommandsArray));
	});
};
