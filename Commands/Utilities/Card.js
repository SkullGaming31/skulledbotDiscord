/**
 * Author: Amit Kumar
 * Github: https://github.com/AmitKumarHQ
 * Created On: 5th April 2022
 */

 const { MessageEmbed, CommandInteraction, } = require("discord.js");

const DB = require("../../Structures/Schemas/CardSystemDB");

module.exports = {
  name: 'card',
  description: 'Card System',
  permission: 'ADMINISTRATOR',
  options: [
      {
          name: 'welcome',
          description: 'Welcome Card Settings',
          type: 'SUB_COMMAND',
          required: false,
          options: [
              {
                  name: 'channel',
                  description: 'Set The Welcome Card Channel',
                  type: 'CHANNEL',
                  required: true,
              }, {
                  name: 'title',
                  description: 'Set The Welcome Card Title',
                  type: 'STRING',
                  required: false,
              }, {
                  name: 'desc',
                  description: 'Set The Welcome Card Description',
                  type: 'STRING',
                  required: false,
              },
          ],
      }, {
          name: 'leave',
          description: 'Leave Card Settings',
          type: 'SUB_COMMAND',
          required: false,
          options: [
              {
                  name: 'channel',
                  description: 'Set The Leave Card Channel',
                  type: 'CHANNEL',
                  required: true,
              }, {
                  name: 'title',
                  description: 'Set The Leave Card Title',
                  type: 'STRING',
                  required: false,
              }, {
                  name: 'desc',
                  description: 'Set The Leave Card Description',
                  type: 'STRING',
                  required: false,
              },
          ],
      }, {
          name: 'reset',
          description: 'Reset The Card System Settings',
          type: 'SUB_COMMAND',
          required: false,
      }
  ],

  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
      const { guild, options } = interaction;

      try {
          switch (interaction.options.getSubcommand()) {
              case 'welcome': {
                  const welcTitle = options.getString('title');
                  const welcDesc = options.getString('desc');
                  const welcChannel = options.getChannel('channel');

                  const welcGuildData = await DB.findOneAndUpdate({
                      GuildID: guild.id
                  }, {
                      WelcomeTitle: welcTitle,
                      WelcomeDesc: welcDesc,
                      WelcomeChannel: welcChannel.id,
                  }, {
                      new: true,
                      upsert: true,
                  });

                  if(welcChannel.type !== 'GUILD_TEXT') {
                      await DB.findOneAndUpdate({
                          GuildID: guild.id
                      }, {
                          WelcomeChannel: null,
                      });
                  
                      return interaction.reply({
                          embeds: [
                              new MessageEmbed()
                                  .setColor('#FF5555')
                                  .setTitle('🛑 Invalid Channel!')
                                  .setDescription(`The Channel Should Be A Text Channel!`)
                          ],
                          ephemeral: true,
                      });
                  }

                  interaction.reply({
                      embeds: [
                          new MessageEmbed()
                              .setColor(`#55FF55`)
                              .setTitle("Welcome Card Settings")
                              .setDescription(`Card Settings Updated!`)
                      ], 
                      ephemeral: true,
                  });
              } break;


              case 'leave': {
                  const leaveTitle = options.getString('title');
                  const leaveDesc = options.getString('desc');
                  const leaveChannel = options.getChannel('channel');

                  const leaveGuildData = await DB.findOneAndUpdate({
                      GuildID: guild.id
                  }, {
                      LeaveTitle: leaveTitle,
                      LeaveDesc: leaveDesc,
                      LeaveChannel: leaveChannel.id,
                  }, {
                      new: true,
                      upsert: true,
                  });

                  if(leaveChannel.type !== 'GUILD_TEXT') {
                      await DB.findOneAndUpdate({
                          GuildID: guild.id
                      }, {
                          LeaveChannel: null,
                      });
                  
                      return interaction.reply({
                          embeds: [
                              new MessageEmbed()
                                  .setColor('#FF5555')
                                  .setTitle('🛑 Invalid Channel!')
                                  .setDescription(`The Channel Should Be A Text Channel!`)
                          ],
                          ephemeral: true,
                      });
                  }

                  interaction.reply({
                      embeds: [
                          new MessageEmbed()
                              .setColor(`#55FF55`)
                              .setTitle("Leave Card Settings")
                              .setDescription(`Card Settings Updated!`)
                      ], 
                      ephemeral: true,
                  });
              } break;


              case 'reset': {
                  await DB.deleteOne({
                      GuildID: interaction.guildId
                  });
          
                  interaction.reply({
                      embeds: [
                          new MessageEmbed()
                          .setColor('#55FF55')
                          .setTitle('Reset Successful!')
                          .setDescription(`Removed All Card Settings!`)
                      ],
                      ephemeral: true
                  });
              } break;
          }
      } catch (err) {
          console.log(err);
      }
  }
}
