const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const config = require('../../Structures/config');

module.exports = {
  name: 'restart',
  description: 'Restart the Dayz Server',
  permission: 'MANAGE_MESSAGES',
  options: [
    {
      name: 'restart_message',
      description: 'Send a message to the ingame chat to notify players the server is restarting',
      type: 'STRING',
      required: false
    }
  ],

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    /* const nitrado = axios.create({ baseURL: `https://api.nitrado.net/services/${config.NITRADO_ID}/gameservers` });

    nitrado.post('/restart', {
      headers: {
        'Authorization': `Bearer ${config.NITRADO_API}`,
        'Accept': 'application/json',
        'User-Agent': 'axios/0.26.1'
      }
    }); */
    interaction.reply({ content: 'Not Currently Working yet', ephemeral: true });
  }
}