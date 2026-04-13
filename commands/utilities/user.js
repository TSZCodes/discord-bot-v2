const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Gives information about the user whom run this command'),
  async execute(interaction) {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`,
    );
  },
};
