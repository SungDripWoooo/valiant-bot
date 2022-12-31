const { ApplicationCommandType, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Shows the command prefix for this server',
    type: ApplicationCommandType.ChatInput,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: "Pong !!",
        });
    },
};