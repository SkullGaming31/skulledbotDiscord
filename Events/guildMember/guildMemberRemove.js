const { GuildMember } = require('discord.js');
module.exports = {
	name: 'guildMemberRemove',
	/**
  * 
  * @param {GuildMember} member 
  */
	async execute (member) {
	
		console.log('Member left: ', member.displayName);
		const targetChannel = member.guild.channels.cache.get('838158641072832562');// Logs Channel ID
		
		try {
			if (targetChannel.isText()) await targetChannel.send({ content: `${member.user} left the server` });
		} catch (err) {console.error(err); }
	},
};