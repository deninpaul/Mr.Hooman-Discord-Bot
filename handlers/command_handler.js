const fs = require('fs');

module.exports = (client, Discord) => {
    //Loading Command Files
    client.config = require('../utils/config.js');
    const jsCommandFiles = fs.readdirSync('./commands/').filter(
        file => file.endsWith('.js')
    );

    //adding commands and aliases from respective files
    for (const file of jsCommandFiles) {
        console.log(`Loaded ${file}`);
        const pull = require(`../commands/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            pull.aliases.forEach(alias => {
                client.aliases.set(alias, pull.name);
            });
        }
    }
}