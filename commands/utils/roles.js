const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rol")
    .setDescription("asgina un rol deprueba"),
  async execute(interaction) {
    await interaction.reply(`Rol añadido`);
  },
};
