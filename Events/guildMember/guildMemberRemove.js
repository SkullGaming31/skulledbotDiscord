const { GuildMember, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberRemove',
	/**
	* 
	* @param {GuildMember} member 
	*/
	async execute(member) {
		const { guild } = member;

		// console.log('Member left: ', member.displayName);
		const personalDiscord = guild.channels.cache.get('838158641072832562');// personal discord Logs Channel ID
		const daydDiscord = guild.channels.cache.get('989110717837873172');// dayd discord Logs Channel ID

		const embed = new MessageEmbed()
			.setTitle('MEMBER LEFT')
			.setColor('RED')
			.setDescription(`\`${member.user}\` left the server`)
			.setFooter({ text: `${member.id}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` });

		try {
			switch (guild.id) {
				case '985309600347717672': // DAYD discord
					if (daydDiscord.isText()) await daydDiscord.send({ embeds: [embed] });
					break;
				case '797740303176040498':
					if (personalDiscord.isText()) await personalDiscord.send({ embeds: [embed] });
					break;
			}
		} catch (err) { console.error(err); }
	},
};