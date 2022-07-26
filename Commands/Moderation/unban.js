/* eslint-disable indent */
const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const ms = require('ms');
const EditReply = require('../../Systems/editReply');
module.exports = {
  name: 'unban',
  description: 'unban a member from the guild',
  UserPerms: ['BanMembers'],
  BotPerms: ['BanMembers'],
  category: 'Moderation',
  options: [
    {
      name: 'user-id',
      description: 'provide the users id',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction.deferReply({ ephemeral: true });
    const { options, user, guild } = interaction;

    const id = options.getString('user-id');
    if (isNaN(id)) return EditReply(interaction, '❌', 'Please provide a valid ID in numbers!');
    const bannedMembers = await guild.bans.fetch();
    if (!bannedMembers.find(x => x.user.id === id)) return EditReply(interaction, '❌', 'the user is not banned');


    const unbanEmbed = new EmbedBuilder().setColor(Colors.Blue);
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('ban-yes').setLabel('Yes'),
      new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId('ban-no').setLabel('No')
    );
    const page = await interaction.editReply({
      embeds: [
        unbanEmbed.setDescription('**⚠ | do you really wanna ban this member?**')
      ],
      components: [row]
    });
    const col = await page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms('15s')
    });
    col.on('collect', i => {
      if (i.user.id !== user.id) return;
      switch (i.customId) {
        case 'unban-yes':
          guild.member.unban(id);
          interaction.reply({
            embeds: [
              unbanEmbed.setDescription('**✔ | the user has been unbanned**')
            ],
            components: []
          });
          break;
        case 'unban-no':
          interaction.editReply({
            embeds: [
              unbanEmbed.setDescription('✅ | unban Request Canceled')
            ],
            components: []
          });
          break;
      }
    });
    col.on('end', (collected) => {
      if (collected.size > 0) return;
      interaction.editReply({
        embeds: [unbanEmbed.setDescription('❌ | you did not provide a valid response in time')],
        components: []
      });
    });
  }
};