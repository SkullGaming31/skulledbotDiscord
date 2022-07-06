const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy");

module.exports = {
  name: "eco-help",
  description: "Shows economy commands",
  permission: "SEND_MESSAGES",

  async execute(interaction) {
    const helpEmbed = new MessageEmbed()
      .setTitle("Economy Help")
      .setDescription('**__Bot Commands:__**\n/help\n/balance\n/daily\n/weekly\n/work\n/eco-leaderboard\n/bank-leaderboard\n/withdraw\n/deposit')
      .setColor("RANDOM")


    interaction.reply({ embeds: [helpEmbed] })
  }
}