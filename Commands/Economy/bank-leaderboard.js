const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy");

module.exports = {
  name: "bank-leaderboard",
  description: "Shows leaderboard",
  permission: "SEND_MESSAGES",

  async execute(interaction) {
    const { guild } = interaction;

    let lb = eco.bank.leaderboard(guild.id);
    if (!lb.length) {
      return interaction.reply(`Cannot generate a leaderboard: the server database is empty.`)
    }
    let leaderboard = await lb.map((value, index) => {
      return `\`${index + 1}\`<@${value.userID}>'s Coins: **${value.money}**`
    })

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(leaderboard.join("\n"))
          .setTitle(`Bank Leaderboard for **${guild.name}**`)
          .setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` })
      ]
    })
  }
}