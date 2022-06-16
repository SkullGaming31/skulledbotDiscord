const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'deploy',
  description: 'Deploy a testing button',
  permission: 'MANAGE_MESSAGES',

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    const Embed = new MessageEmbed()
      .setDescription('Click Here')
      .setColor('GREEN');

    const Row = new MessageActionRow();
    Row.addComponents(
      new MessageButton().setCustomId('age-submit').setLabel('Answer').setStyle('SUCCESS')
    );
    interaction.reply({ embeds: [Embed], components: [Row] });
  }
}