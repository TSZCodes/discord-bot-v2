const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Displays yours or others' avatars!")
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The user you want to see the avatar')
        .setRequired(true),
    ),
  async execute(interaction) {
    const randomColor = () => Math.floor(Math.random() * 0xffffff);
    const user = interaction.options.getUser('target');
    const embed = new EmbedBuilder()
      .setColor(randomColor())
      .setTitle(`${user.username}\'s Avatar`)
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setTimestamp()
      .setFooter({ text: 'Nerd shit', iconURL: user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};
