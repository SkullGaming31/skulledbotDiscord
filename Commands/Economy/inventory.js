const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy")

module.exports = {
  name: "inventory",
  description: "User inventory",
  permission: 'SEND_MESSAGES',
  options: [
    {
      name: "show",
      description: "Shows user inventory",
      type: "SUB_COMMAND"
    },
    {
      name: "clear",
      description: "Clears user inventory",
      type: "SUB_COMMAND"
    }
  ],
  async execute(interaction) {
    const { guild, options, user } = interaction;

    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "show":
        const inv = eco.inventory.fetch(user.id, guild.id)
        if (!inv.length) return interaction.reply('You don\'t have any items in your inventory.')

        let invMap = inv.map((x, i) => `ID: ${i + 1}: ${x.itemName} - ${x.price} coins (${x.date})\n`);

        interaction.reply({ embeds: [new MessageEmbed().setTitle("Inventory").setDescription(invMap.join("\n"))] })
        break;
      case "clear":
        eco.inventory.clear(user.id, guild.id);
        interaction.reply({
          embeds: [new MessageEmbed()
            .setTitle("Inventory Cleared")
            .setDescription("Your inventory was successfully cleared.")
            //IMPORTANT NOTE, EVERY MEMBER CAN USE THIS COMMAND MEANING IF THEY DELETE THEIR INVENTORY IT CANNOT BE UNDONE!!!
          ]
        });
        break;
    }
  }
}