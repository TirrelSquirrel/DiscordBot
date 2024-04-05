const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionrole")
    .setDescription("Manage your reaction roles system")
    .addSubcommand(command =>
      command
        .setName("add")
        .setDescription("Add reaction roles")
        .addStringOption(option =>
          option
            .setName("message-id")
            .setDescription("The message to react to")
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName("emoji")
            .setDescription("Emoji to react")
            .setRequired(true)
        )
        .addRoleOption(option =>
          option
            .setName("role")
            .setDescription("The role you want to get")
            .setRequired(true)
        )
    )
    .addSubcommand(command =>
      command
        .setName("remove")
        .setDescription("Remove reaction roles")
        .addStringOption(option =>
          option
            .setName("message-id")
            .setDescription("The message to react to")
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName("emoji")
            .setDescription("Emoji to react")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const { options, guild, channel } = interaction;
    const sub = options.getSubCommand();
    const emoji = options.getString();

    let e;
    const message = await channel.messages
      .fetch(options.getString("message-id"))
      .catch((err) => {
        e = err;
      });

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "You dont have permissions to use this system",
        ephemeral: true,
      });
    if (e)
      return await interaction.reply({
        content: `Be sure to get a message from ${channel}`,
        ephemeral: true,
      });

    const data = await reaction.findOne({
      Guild: guild.id,
      Message: message.id,
      Emoji: emoji,
    });

    switch (sub) {
      case "add":
        if (data) {
          return await interaction.reply({
            content: `It looks like you  already have this reaction setup using ${emoji} on this message`,
            ephemeral: true,
          });
        } else {
          const role = options.getRole("role");
          await reaction.create({
            Guild: guild.id,
            Message: message.id,
            Emoji: emoji,
            Role: role.id,
          });

          const embed = new EmbedBuilder()
            .setColor("Burple")
            .setDescription(
              `🤔 I have added areaction role  to ${message.url} with ${emoji} and the role ${role}`
            );

          await message.react(emoji).catch((err) => {});

          await interaction.reply({ embed: [embed], ephemeral: true });
        }

        break;

      case "remove":
        if (!data) {
          return await interaction.reply({
            content: `It doesnt look like that reaction role exists`,
            ephemeral: true,
          });
        } else {
          await reaction.deleteMany({
            Guild: guild.id,
            Message: message.id,
            Emoji: emoji,
          });

          const embed = new EmbedBuilder()
            .setColor("Burple")
            .setDescription(
              `🤔 I have removed the reaction role from ${message.url} with ${emoji}`
            );

          await interaction.reply({ embed: [embed], ephemeral: true });
        }
    }
  },
};
