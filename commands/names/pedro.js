const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pedro")
    .setDescription("menciona a Pedro"),
  async execute(interaction) {
    await interaction.reply(`@creocuecedro dice mi pana ${interaction.user.username} que a ver si le mandas una foto pie UwU`);
  },
};
