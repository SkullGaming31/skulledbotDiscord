const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy");

module.exports = {
  name: "work",
  description: "Get your work rewards",
  permission: "SEND_MESSAGES",

  async execute(interaction) {
    const { member, guild } = interaction;

    let work = eco.rewards.work(member.id, guild.id);
    if (!work.status) {

      const claimedEmbed = new MessageEmbed()
        .setDescription(`You have already worked! Time left until next work: **${work.value.days}** days, **${work.value.hours}** hours, **${work.value.minutes}** minutes and **${work.value.seconds}** seconds.`)
        .setColor("GREEN")

      return interaction.reply({ embeds: [claimedEmbed] });
    }
    const receiveEmbed = new MessageEmbed()
      .setTitle("Work Rewards")
      .setDescription(`You worked hard and earned **\`${work.pretty}\`** coins!`)
      .setColor("GREEN")

    interaction.reply({ embeds: [receiveEmbed] });
  }
}