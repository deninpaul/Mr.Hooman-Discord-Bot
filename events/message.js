const config = require("../utils/config.js");

module.exports = (Discord, client, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (!commandFile) return;

    try {
        commandFile.execute(message, command, args, Discord);
    } catch (e) {
        return message.channel.send(`An error occured on ${command} :\n ${e.message}`);
    }
}