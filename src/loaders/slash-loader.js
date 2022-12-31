
const path = require('path');
const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = {
    load: client => {
        let allcommands = [];

        client.scommands = new Collection();
        fs.readdirSync(path.join(__dirname, '..', 'slashCommands'))
            .filter(fileName => fileName.endsWith('.js'))
            .map(fileName => require(`../slashCommands/${fileName}`))
            .sort((c1, c2) => {
                if (c1.metadata.botOwnerOnly) {
                    return -1;
                }
                return c1.metadata.permissions?.toString().localeCompare(c2.metadata.permissions?.toString());
            })
            .forEach((Command, i, arr) => {
                client.scommands.set(Command.name.toLowerCase(), Command);
                allcommands.push(Command);
            });

        client.on("ready", async () => {
            client.application.commands.set(allcommands);
            console.log("Slash Command set");
        });
    }
};