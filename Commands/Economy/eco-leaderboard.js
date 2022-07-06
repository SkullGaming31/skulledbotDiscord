const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy");

module.exports = {
  name: "eco-leaderboard",
  description: "Shows leaderboard",
  permission: "SEND_MESSAGES",

  async execute(interaction) {
    const { member, guild } = interaction;

    let lb = eco.balance.leaderboard(guild.id);
    if (!lb.length) {
      return interaction.reply(`Cannot generate a leaderboard: the server database is empty.`)
    }
    let leaderboard = await lb.map((value, index) => {
      return `\`${index + 1}\`<@${value.userID}>'s Coins: **${value.money}**`
    })

    interaction.reply({ embeds: [new MessageEmbed().setColor("RANDOM").setDescription(leaderboard.join("\n")).setTitle(`Money Leaderboard for **${guild.name}**`).setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || ''}` })] });
  }
}