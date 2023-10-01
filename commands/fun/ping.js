const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Contesta PONG'),
    async execute(interaction) {
        await interaction.reply('PONG')
    }
}