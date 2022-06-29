const { GuildMember } = require('discord.js');
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

		try {
			switch (guild.id) {
				case '985309600347717672': // DAYD discord
					if (daydDiscord.isText()) await daydDiscord.send({ content: `${member} left the server` });
					break;
				case '797740303176040498':
					if (personalDiscord.isText()) await personalDiscord.send({ content: `${member} left the server` });
					break;
			}
		} catch (err) { console.error(err); }
	},
};