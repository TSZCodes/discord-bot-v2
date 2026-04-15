const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addexpense')
    .setDescription('Adds expense to sheets')
    .addStringOption((option) =>
      option
        .setName('expense')
        .setDescription('What did you spend on?')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('nominal')
        .setDescription('How much? (Make sure to only use numbers, i.e 5000)')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('date')
        .setDescription(
          'When did you purchase this? (Use the format dd/mm/yyyy)',
        )
        .setRequired(true),
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const url = process.env.sheetsURL;
    const expense = interaction.options.getString('expense');
    const nominal = interaction.options.getString('nominal');
    const date = interaction.options.getString('date');
    const convertedDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    };
    try {
      await axios.post(url, {
        data: {
          Expense: expense,
          Nominal: nominal,
          Date: convertedDate(date),
        },
      });
      await interaction.editReply('Successfully added');
    } catch (error) {
      console.error('Error posting to sheets', error);
      await interaction.editReply('There was an error putting to sheets!');
    }
  },
};
