const { Client, ChatInputCommandInteraction, EmbedBuilder, Colors, ApplicationCommand, InteractionType, ChannelType } = require('discord.js');
// const settingsDB = require('../../Structures/Schemas/settingsDB');
const Reply = require('../../Systems/reply');
module.exports = {
	name: 'interactionCreate',
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client
	 */

	async execute(interaction, client) {
		const { user, guild, commandName, member, type } = interaction;
		// console.log('command used');
		if (!guild || user.bot) return;
		if (type !== InteractionType.ApplicationCommand) return;
		const command = client.commands.get(commandName);
		if (!command) return Reply(interaction, '⛔', 'an error occured while trying to run this command', true) && client.commands.delete(commandName);
		if (command.UserPerms && command.UserPerms.length !== 0) if (!member.permissions.has(command.UserPerms)) return Reply(interaction, '⛔', `you need \`${command.UserPerms.join(', ')}\` permission(s) to execute this command!`, true);
		if (command.UserPerms && command.BotPerms.length !== 0) if (!member.permissions.has(command.BotPerms)) return Reply(interaction, '⛔', `you need \`${command.BotPerms.join(', ')}\` permission(s) to execute this command!`, true);

		command.execute(interaction, client);
		// const Data = await settingsDB.findOne({ GuildID: guild.id });
		// if (!Data) return;
		// const targetChannel = guild.channels.cache.find(channel => channel.id === '838158641072832562');// Logs Channel

		// const logsEmbed = new EmbedBuilder()
		// 	.setTitle('Command Usage Detection')
		// 	.setDescription(`${interaction.user} used /${interaction.commandName} in ${interaction.channel.name}`) // user commandUsed inwhatchannel
		// 	.setColor(Colors.Green)
		// 	.setTimestamp();
		// if (type === ChannelType.GuildText) await targetChannel.send({ embeds: [logsEmbed] });
	},
};