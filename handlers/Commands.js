const { Perms } = require('../Structures/validation/Permissions');
const { Client } = require('discord.js');

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii('Commands Loaded');

	CommandsArray = [];

	(await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
		const command = require(file);

		if (!command.name)
			return Table.addRow(file.split('/')[7], '🔸 FAILED', 'Missing a name');

		if (!command.context && !command.description)
			return Table.addRow(command.name, '🔸 FAILED', 'Missing a description');

		if (!command.permission) {
			if (Perms.includes(command.permission))
				command.defaultPermission = false;
			else
				return Table.addRow(command.name, '🔸 FAILED', 'Permission is invalid');
		}

		client.commands.set(command.name, command);
		CommandsArray.push(command);

		await Table.addRow(command.name, '🔹 SUCCESSFUL');
	});
	console.log(Table.toString());

	// Enabling Commands for all Guilds //
	client.on('ready', async () => {
		// const MainGuild = client.guilds.cache.get('797740303176040498');
		// MainGuild.commands.set(CommandsArray);
		client.guilds.cache.forEach((g) =>
			g.commands.set(CommandsArray));
	});
};
