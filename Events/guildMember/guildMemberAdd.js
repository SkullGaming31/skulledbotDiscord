// const { MessageEmbed, GuildMember, WebhookClient, Interaction } = require('discord.js');
// const config = require('../../Structures/config');
// module.exports = {
// 	name: 'guildMemberAdd',

// 	async execute (member) {
// 		const Welcomer = new WebhookClient({
// 			id: config.WELCOMER_ID,
// 			token: config.WELCOMER_TOKEN
// 		});
// 		const { user, guild } = member;

// 		switch(guild.id) {
// 		case '797740303176040498':// My Guild ID
// 			member.roles.add('799629973270298675');
// 			break;
// 		case '819180459950473236':// mods Guild ID
// 			member.roles.add('879461309870125147');
// 			break;
// 		}
// 		const Welcome = new MessageEmbed()
// 			.setColor('#32CD32')
// 			.setAuthor({ name: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
// 			.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
// 			.setDescription(`Welcome \`${member.displayName}\` to the **${guild.name}**`)
// 			.addFields([
// 				{
// 					name: 'Account Created: ',
// 					value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
// 					inline: true
// 				},
// 				{
// 					name: 'Latest Member Count: ',
// 					value: `${guild.memberCount}`,
// 					inline: true
// 				}
// 			])
// 			.setFooter({ text: `ID: ${user.id}`, iconURL: `${guild.iconURL({ dynamic: true })}` });

// 		Welcomer.send({ content: `${member.user.tag}`, embeds: [Welcome]});
// 	},
// };

/**
 * Author: Amit Kumar
 * Github: https://github.com/AmitKumarHQ
 * Created On: 27th March 2022
 */

 const { GuildMember, MessageEmbed } = require("discord.js");
 const { drawCard, Text } = require('discord-welcome-card');
 const DB = require("../../Structures/Schemas/CardSystemDB");
 
 module.exports = {
		 name: 'guildMemberAdd',
 
		 /**
			* @param {GuildMember} member 
			*/
		 async execute(member) {
				 const { guild } = member;
 
				 if(member.user.bot) return;
 
				 // Database
				 const db = await DB.findOne({
						 GuildID: guild.id
				 });
 
				 if(db) {
						 const title = db.WelcomeTitle || 'Welcome!';
						 const desc = db.WelcomeDesc || member.user.tag;
						 const channel = db.WelcomeChannel;
		 
						 const image = await drawCard({
								 theme: "dark",
								 blur: false,
								 rounded: true,
								 text: {
										 title: new Text(title, 250, 100)
												 .setFontSize(35)
												 .setStyle(`#03B0CC`),
										 text: new Text(desc, 250, 170)
												 .setFontSize(35),
										 color: `#DDDDDD`,
										 font: 'Panton Black Caps',
								 },
								 avatar: {
										 image: member.user.avatarURL({
												 dynamic: true,
												 format: 'png',
												 size: 2048,
										 }),
										 borderRadius: 1, // Corner radius of the avatar (0.5 = 50% rounded)
										 imageRadius: 0.75, // Size of the avatar (0.85 = 85%)
										 outlineWidth: 10,
										 outlineColor: "#00B1CD",
								 },
								 background: './Structures/Images/vape_bg.png',
						 });
		 
						 const embed = new MessageEmbed()
						 .setColor(`#55FF55`)
						 .setAuthor({
								 name: `NEW USER JOINED`,
								 iconURL: member.user.displayAvatarURL({
										 dynamic: true,
										 format: 'png',
								 })
						 })
						 .setDescription(`Thank you for joining the server!`)
						 .setThumbnail(member.user.displayAvatarURL({
								 dynamic: true,
								 format: 'png',
						 }))
		 
						 if(channel) {
								 member.guild.channels.cache.get(channel)
								 .send({ content: `${member}`,
										 // embeds: [embed],
										 files: [{
												 attachment: image
										 }]
								 });
						 } else if (!channel) {
								 member.guild.systemChannel
								 .send({ content: `${member}`,
										 // embeds: [embed],
										 files: [{
												 attachment: image
										 }]
								 });
						 }
				 } else if(!db) {
						 const title = 'Welcome!';
						 const desc = member.user.username;
						 const channel = member.guild.systemChannel.id;
 
						 const image = await drawCard({
								 theme: "dark",
								 blur: false,
								 rounded: true,
								 text: {
										 title: new Text(title, 250, 100)
												 .setFontSize(35)
												 .setStyle(`#03B0CC`),
										 text: new Text(desc, 250, 170)
												 .setFontSize(55),
										 color: `#DDDDDD`,
										 font: 'Panton Black Caps',
								 },
								 avatar: {
										 image: member.user.avatarURL({
												 dynamic: true,
												 format: 'png',
												 size: 2048,
										 }),
										 borderRadius: 1, // Corner radius of the avatar (0.5 = 50% rounded)
										 imageRadius: 0.75, // Size of the avatar (0.85 = 85%)
										 outlineWidth: 10,
										 outlineColor: "#00B1CD",
								 },
								 background: "./Structures/Images/vape_bg.png",
						 });
 
						 const embed = new MessageEmbed()
								 .setColor(`#55FF55`)
								 .setAuthor({
										 name: `NEW USER JOINED`,
										 iconURL: member.user.displayAvatarURL({
												 dynamic: true,
												 format: 'png',
										 })
								 })
								 .setDescription(`Thank you for joining the server!`)
								 .setThumbnail(member.user.displayAvatarURL({
										 dynamic: true,
										 format: 'png',
								 }))
 
						 member.guild.channels.cache.get(channel)
						 .send({ content: `${member}`,
								 // embeds: [embed],
								 files: [{
										 attachment: image
								 }]
						 });
				 }
		 }
 }