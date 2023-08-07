const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a list of commands and attributions.'),
	async execute(interaction) {

		let totalSeconds = (interaction.client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
	
		let ServerCount = await interaction.client.guilds.cache.size;
		let memberCount = await interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
		let botping = `${Date.now() - interaction.createdTimestamp}ms`;

		const ButtonsRow = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setLabel('GitHub Repository')
			.setStyle(ButtonStyle.Link)
			.setURL("https://github.com/dumprr/Sentaku")
			.setEmoji("🐱")
		)

		const HelpEmbed = new EmbedBuilder()
		.setAuthor({
			url: `https://github.com/dumprr/Sentaku`,
			name: 'dumprr/Trudare '
		})
		.setColor('Orange')
		.setTitle('Trudare Commands + More')
		.addFields(
			{name: "---------------------------------------------------------", value: `\n----------------------------------------------------------`, },
			{name: "Server Count", value: `${ServerCount}`, inline: true},
			{name: "Member Count", value: `${memberCount}`, inline: true},
			{name: "Bot Latency", value: `${botping} (it's weird, will patch later)`, inline: true},
			{name: "Uptime", value: `\`\`\`${uptime}\`\`\``},
			{name: "---------------------------------------------------------", value: `\n----------------------------------------------------------`, },
			{name: "/ping", value: "Gets the ping of the bot 🏓", inline: true},
			{name: "/help", value: "This message! 📋", inline: true},
			{name: "---------------------------------------------------------", value: `\n----------------------------------------------------------`, },
			{name: "Attributions", value: `Based off of dumprr/Sentaku git repo\nChanged from multipurpose to fun bot`}
		)
	    .setFooter({
			text: `Requested by: ${interaction.user.tag}`,
			iconURL: interaction.user.avatarURL(),
		  })
		await interaction.reply({ embeds: [HelpEmbed], components: [ButtonsRow] });
	},
};