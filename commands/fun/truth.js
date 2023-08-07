const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('truth')
		.setDescription('Truth Question!'),
	async execute(interaction, client) {
        const ButtonsRow = new ActionRowBuilder()
        .addComponents(
			new ButtonBuilder()
            .setCustomId("daredanger")
			.setLabel('Dare')
			.setStyle(ButtonStyle.Danger)
		)
        .addComponents(
			new ButtonBuilder()
            .setCustomId("truthprimary")
			.setLabel('Truth')
			.setStyle(ButtonStyle.Primary)
		)
        let results = require("../../truth-questions.js")
        let result = Math.floor((Math.random() * results.length));
        const coolembed = new EmbedBuilder()
        .setAuthor({
			url: `https://github.com/dumprr/Trudare`,
			name: 'dumprr/Trudare '
		})
        .setColor("Blue")
        .setDescription(`${results[result]}`) // make a JSON with questions and import
        .setFooter({
			text: `for ${interaction.user.tag}`,
			iconURL: interaction.user.avatarURL(),
		  })
        await interaction.reply({ embeds: [coolembed], components: [ButtonsRow] });
	},
};