const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pachone")
    .setDescription("menciona a Pachone"),
  async execute(interaction) {
    await interaction.reply(`@Pachone dice mi pana ${interaction.user.username} que a ver si le das una vueltecita en moto para que te coja de la cintura y estéis muy pegaditos grrr`);
  },
};
