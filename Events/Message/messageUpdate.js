const { MessageEmbed, Message, WebhookClient } = require('discord.js');
const settings = require('../../Structures/Schemas/settingsDB');

module.exports = {
	name: 'messageUpdate',
	/**
 * 
 * @param {Message} oldMessage 
 * @param {Message} newMessage 
 */
	async execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;

		if (oldMessage.content === newMessage.content) return;
		const Data = await settings.findOne({ GuildID: guild.id });

		const Count = 1950;

		const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > Count ? ' ...' : '');
		const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > Count ? ' ...' : '');

		const log = new MessageEmbed()
			.setColor('YELLOW')
			.setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
		**Original**:\n ${Original} \n**Edited**: \n ${Edited}`)
			.setFooter({ text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

		// new WebhookClient({ url: 'https://discord.com/api/webhooks/953292735169822780/HLckBgpx7OG4awR2QZIL1jTWZr6-zeMINiFWlvDGyZDsyo0LkvwL-TyWxv8u412qRgwx' }).send({embeds: [log]}).catch((err) => {
		// 	console.error(err);
		// });
		newMessage.guild.channels.cache.get(Data.LoggingChannel).send({ embeds: [log] });
		if (!Data) return;
	}
};