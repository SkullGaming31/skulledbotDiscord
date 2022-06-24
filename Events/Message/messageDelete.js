const { MessageEmbed, Message, WebhookClient } = require('discord.js');
const settings = require('../../Structures/Schemas/settingsDB');

module.exports = {
	name: 'messageDelete',

	/**
	 * 
	 * @param {Message} message 
	 */
	async execute(message) {
		if (message.author.bot) return;
		const { guild } = message;
		const Data = await settings.findOne({ GuildID: guild.id });

		const log = new MessageEmbed()
			.setColor('GREEN')
			.setDescription(`🚨 a [message](${message.url}) by ${message.author.tag} was **deleted**.\n **Deleted Message:**\n ${message.content ? message.content : 'None'}`.slice(0, 4096));

		if (message.attachments.size >= 1) {
			log.addField('Attachments:', `${message.attachments.map(a => a.url)}`, true);
		}
		guild.channels.cache.get(Data.LoggingChannel).send({ embeds: [log] });
		// new WebhookClient({ url: 'https://discord.com/api/webhooks/953292735169822780/HLckBgpx7OG4awR2QZIL1jTWZr6-zeMINiFWlvDGyZDsyo0LkvwL-TyWxv8u412qRgwx'}
		// ).send({ embeds: [log]}).catch((err) => {
		// 	console.error(err);
		// });
		if (!Data) return;
	}
};