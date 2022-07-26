/* eslint-disable indent */
const { GuildMember, EmbedBuilder, Colors, InteractionCollector } = require('discord.js');
module.exports = {
  name: 'guildMemberRemove',
  /**
  * 
  * @param {GuildMember} member 
  */
  async execute(member) {
    const { guild, user } = member;

    // console.log('Member left: ', member);
    const personalDiscord = guild.channels.cache.get('838158641072832562');// personal discord Logs Channel ID

    const embed = new EmbedBuilder()
      .setTitle('MEMBER LEFT')
      .setColor(Colors.Red)
      .setDescription(`\`${user.username}\` left the server`)
      .setFooter({ text: `Members ID: ${member.id}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` });

    try {
      switch (guild.id) {
        case '797740303176040498':
          await personalDiscord.send({ embeds: [embed] });
          break;
      }
    } catch (err) { console.error(err); }
  },
};