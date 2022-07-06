const { ButtonInteraction } = require('discord.js');
module.exports = {
  id: 'test',
  permission: 'MANAGE_MESSAGES',

  /**
   * 
   * @param {ButtonInteraction} interaction 
   */
  async execute(interaction) {
    interaction.reply({ content: 'this button is working :)', ephemeral: true });
  }
}