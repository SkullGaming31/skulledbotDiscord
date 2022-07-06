const { CommandInteraction, MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy")

module.exports = {
  name: "removemoney",
  description: "Removey money from a user",
  permission: 'MANAGE_MESSAGES',
  options: [
    {
      name: "user",
      description: "Mention a user which you want to remove money from",
      type: "USER",
      required: true,
    },
    {
      name: "amount",
      description: "Give amount",
      type: "NUMBER",
      required: true,
    },
  ],

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    const { guild, options, member } = interaction;

    let target = options.getUser("user") || member
    let amount = options.getNumber("amount") || 1
    eco.balance.subtract(amount, target.id, guild.id)

    const embed = new MessageEmbed()
      .setTitle("Coins Succesfully Removed")
      .setDescription(`Removed ${amount} coins from ${target}`)
      .setColor("GREEN")

    interaction.reply({ embeds: [embed] })
  }
}