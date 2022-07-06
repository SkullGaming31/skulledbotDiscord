const { MessageEmbed } = require("discord.js");
const eco = require("../../handlers/Economy")

module.exports = {
  name: "shop",
  description: "Shows the shop list",
  permission: 'SEND_MESSAGES',
  options: [
    {
      name: "add",
      description: "Add an item to the shop list",
      type: "SUB_COMMAND",
      options: [{
        name: "item",
        description: "Type the item name you want to add.",
        required: true,
        type: "STRING"
      }, {
        name: "price",
        description: "Specify the price of the added item",
        type: "NUMBER",
        required: true,

      }, {
        name: "message",
        description: "Specify the message the user gets when the item is used",
        type: "STRING",
        required: true,
      }, {
        name: "description",
        description: "Add a description to the item",
        required: true,
        type: "STRING"
      },
      {
        name: "amount",
        description: "Specify the max amount the person can have in inventory",
        required: true,
        type: "NUMBER"
      },
      {
        name: "role",
        description: "Add the role the buyers earns when they buy this item (not required)",
        required: false,
        type: "ROLE",
      },]
    },
    {
      name: "remove",
      description: "Remove an item from the shop list",
      type: "SUB_COMMAND",
      options: [{
        name: "item",
        description: "Type the item name you want to remove.",
        required: true,
        type: "STRING"
      }]
    },
    {
      name: "buy",
      description: "Buy an item from the shop list",
      type: "SUB_COMMAND",
      options: [{
        name: "item",
        description: "Type the item name you want to buy",
        required: true,
        type: "STRING"
      }]
    },
    {
      name: "search",
      description: "Search an item from the shop list",
      type: "SUB_COMMAND",
      options: [
        {
          name: "item",
          description: "Type the item name you want to search",
          required: true,
          type: "STRING"
        }
      ]
    },
    {
      name: "list",
      description: "Shows the shop list",
      type: "SUB_COMMAND"
    },
    {
      name: "clear",
      description: "Clear the shop list",
      type: "SUB_COMMAND"
    },
  ],
  async execute(interaction) {
    const { guild, options, user, member } = interaction;

    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "add":
        if (!member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [new MessageEmbed().setDescription("❌ You do not have the permission to use this command")] })

        const item = options.getString("item");
        const price = options.getNumber("price");
        const message = options.getString("message");
        const amount = options.getNumber("amount");
        const roles = options.getRole("role").id;
        const description = options.getString("description");

        eco.shop.addItem(guild.id, {
          itemName: item,
          price: price,
          message: message,
          description: description,
          maxAmount: amount,
          role: roles
        })
        interaction.reply({ embeds: [new MessageEmbed().setDescription('Item successfully added!')] });
        break;
      case "remove":
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [new MessageEmbed().setDescription("❌ You do not have the permission to use this command")] })

        const removeItem1 = options.getString("item");
        if (!removeItem1) return interaction.reply('Specify an item ID or name.')

        const removeItem2 = eco.shop.searchItem(removeItem1, guild.id)
        if (!removeItem2) return interaction.reply(`Cannot find item ${removeItem1}`);

        eco.shop.removeItem(removeItem1, guild.id)

        const removeEmbed = new MessageEmbed()
          .setTitle("Shopping List")
          .setDescription('Item successfully removed!')

        interaction.reply({ embeds: [removeEmbed] });
        break;
      case "list":
        const shoplist = eco.shop.list(guild.id);

        let listMap = shoplist.map(item => `ID: **${item.id}** - **${item.itemName}** (**${item.price}** coins)\nDescription: **${item.description}**\nMax amount in inventory: **${item.maxAmount || Infinity}**\nRole: ${item.role || '**This item doesn\'t give you a role.**'}\n`)

        if (!shoplist.length) return interaction.reply({ embeds: [new MessageEmbed().setDescription('No items in the shop!')] })


        const listEmbed = new MessageEmbed().setDescription(listMap.join("\n"))

        interaction.reply({ embeds: [listEmbed] })
        break;
      case "buy":

        const buyItem1 = options.getString("item");

        const buyBalance = eco.balance.fetch(user.id, guild.id);
        if (!buyItem1) return interaction.reply('Specify an item ID or name.')

        const buyItem2 = eco.shop.searchItem(buyItem1, guild.id);
        if (!buyItem2) return interaction.reply(`Cannot find item ${buyItem1}.`)
        if (buyItem2.price > buyBalance) return interaction.reply(`You don't have enough money (${buyBalance} coins) to buy this item for ${buyItem2.price} coins!`)

        const purchaseItem = eco.shop.buy(buyItem1, user.id, guild.id);
        if (purchaseItem == 'max') return interaction.reply(`You cannot have more than **${buyItem2.itemName}** of item "**${buyItem2.itemName}**".`)

        if (buyItem2.role >= guild.me.roles.highest.position) return interaction.reply({ embeds: [new MessageEmbed().setTitle("Buy failed").setDescription(`I can't give you this role since it is higher than or equal to my role. Please contact staff and ask them to change it.`).setColor('#2F3136')] })

        if (member.roles.cache.has(buyItem2.role)) return interaction.reply(`You can't buy this item since you already have this role!`);

        if (buyItem2.role) interaction.guild.members.cache.get(interaction.user.id).roles.add(interaction.guild.roles.cache.get(buyItem2.role));

        interaction.reply(`You have received item "**${buyItem2.itemName}**" for **${buyItem2.price}** coins!`)
        break;
      case "search":
        const searchItem = options.getString("item");
        if (!searchItem) return interaction.reply('Specify an item ID or name.');

        const searchItem2 = eco.shop.searchItem(searchItem, guild.id);
        if (!searchItem2) return interaction.reply(`Cannot find item ${searchItem}.`)

        interaction.reply(`Item info:\nID: **${searchItem2.id}**\nName: **${searchItem2.itemName}**\nPrice: **${searchItem2.price}** coins\nDesciption: **${searchItem2.description}**\nMessage on use: **${searchItem2.message}**\nMax amount in inventory: **${searchItem2.maxAmount || Infinity}**. Role: ${searchItem2.role || '**This item doesn\'t give you a role.**'}`)
        break;
      case "clear":
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [new MessageEmbed().setDescription("❌ You do not have the permission to use this command")] })

        eco.shop.clear(guild.id);
        interaction.reply({ embeds: [new MessageEmbed().setDescription('Shop was cleared successfully')] })
        break;
    }
  }
}