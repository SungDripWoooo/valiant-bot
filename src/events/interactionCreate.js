const { Events, InteractionType } = require("discord.js");

module.exports = {
  eventName: Events.InteractionCreate,

  execute: async (interaction) => {
    // code
    if (interaction.type == InteractionType.ApplicationCommand) {
      const command = interaction.client.scommands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: `\`${interaction.commandName}\` is not valid command !!`,
          ephemeral: true,
        });
      } else {
        if (
          command.userPermissions &&
          !interaction.member.permissions.has(command.userPermissions)
        ) {
          return interaction.reply({
            content: `you don't have enough permissions !!`,
            ephemeral : true
          });
        } else if (
          command.botPermissions &&
          !interaction.guild.members.me.permissions.has(command.botPermissions)
        ) {
          return interaction.reply({
            content: `i don't have enough permissions !!`,
            ephemeral : true
          });
        } else {
          command.run(interaction.client, interaction);
        }
      }
    }
  }
};
