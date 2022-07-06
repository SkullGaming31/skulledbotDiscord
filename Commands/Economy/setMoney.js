const { CommandInteraction, MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy")

module.exports = {
  name: "setmoney",
  description: "Set user's money",
  permission: 'MANAGE_MESSAGES',
  options: [
    {
      name: "user",
      description: "Mention a user which you want to give money to",
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
    eco.balance.set(amount, target.id, guild.id)

    const setEmbed = new MessageEmbed()
      .setTitle("Coins Succesfully Set")
      .setDescription(`Set **${target}'s** balance to ${amount} coins`)
      .setColor("GREEN")

    interaction.reply({ embeds: [setEmbed] })
  }
} 