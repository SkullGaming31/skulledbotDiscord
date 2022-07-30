const { GuildMember, EmbedBuilder, MessageAttachment, Colors, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

// #32CD32 Lime Green
module.exports = {
	name: 'guildMemberUpdate',

	/**
	 * 
	 * @param {GuildMember} oldMember 
	 * @param {GuildMember} newMember 
	 */
	async execute(oldMember, newMember) {
		const { guild } = newMember;

		const Thankyou = new EmbedBuilder()
			.setColor(Colors.Green)
			.setAuthor({ name: 'SERVER BOOSTED'/* , iconURL: guild.iconURL({ dynamic: true }) */ });

		if (!oldMember.premiumSince && newMember.premiumSince) {
			const canvas = Canvas.createCanvas(800, 250);
			const ctx = canvas.getContext('2d');

			const background = await Canvas.loadImage('../../Structures/Images/boost.jpg');
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			ctx.strokeStyle = '#9B59B6';
			ctx.strokeRect(0, 0, canvas.width, canvas.height);

			ctx.font = '38px cursive';
			ctx.textAlign = 'center';
			ctx.fillStyle = '#ffffff';
			ctx.fillText(newMember.displayName, canvas.width / 2, canvas.height / 1.2);

			const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: 'jpg' }));

			ctx.beginPath();
			ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			ctx.drawImage(avatar, 25, 25, 200, 200);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'booster.jpg');

			try {
				Thankyou.setDescription('Thank you for boosting the server!');
				Thankyou.setImage('attachment://booster.jpg');

				await guild.systemChannel.send({ embeds: [Thankyou], files: [attachment] }).catch((err) => {
					console.error(err);
				});

				Thankyou.setDescription('Thank you for boosting the server! your support is much appreciated.');
				newMember.send({ embeds: [Thankyou] });
			} catch (error) {
				console.error(error);
				return;
			}
		}
	}
};