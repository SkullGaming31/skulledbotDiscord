const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'deploy',
  description: 'Deploy a test button',
  permission: 'MANAGE_MESSAGES',

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    const Embed = new MessageEmbed()
      .setDescription('Click the button, you know you wanna!')
      .setColor('GREEN');

    const Row = new MessageActionRow();
    Row.addComponents(
      new MessageButton().setCustomId('test').setLabel('Test').setStyle('SUCCESS'),
      new MessageButton().setCustomId('test2').setLabel('Test 2').setStyle('PRIMARY')
    );
    interaction.reply({ embeds: [Embed], components: [Row] });
  }
}