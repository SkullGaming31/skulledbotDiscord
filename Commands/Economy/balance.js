const { CommandInteraction, MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy");

module.exports = {
  name: 'bal',
  description: 'Check user balance',
  permission: 'SEND_MESSAGES',

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    const { member, guild } = interaction;

    let balance = eco.balance.fetch(member.id, guild.id)
    let bank = eco.bank.fetch(member.user.id, guild.id)

    if (!balance) balance = 0;
    if (!bank) bank = 0;

    const embed = new MessageEmbed()
      .setTitle(`**${member.user.username}**'s balance`)
      .setDescription(`
            Cash: **${balance}** coins.
            Bank: **${bank}** coins.
        `)
      .setColor("GREEN")

    interaction.reply({ embeds: [embed] })
  }
}