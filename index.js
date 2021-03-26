// Stuff Mr.Hooman requires
const Discord = require('discord.js');
const config = require("./utils/config.js");
require("dotenv").config()
const fs = require('fs');


// Initialzing variables in Mr.Hooman
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require('./utils/config.js');
client.login(config.token_bot || process.env.token);
const jsCommandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


// Shipping features to Mr.Hooman
for (const file of jsCommandFiles) {
    console.log(`Loaded ${file}`);
    const pull = require(`./commands/${file}`);

    client.commands.set(pull.name, pull);
    pull.aliases.forEach(alias => {
        client.aliases.set(alias, pull.name);
    });
}


// Mr.Hooman is getting ready
client.once('ready', () => {
    console.log('Mr.Hooman is online!');
    client.user.setPresence({ activity: { name: `with Hoomans`, type: "PLAYING" } });
});


// Mr.Hooman is up and ready at your service
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!commandFile) return;

    try{
        commandFile.execute(message, args);
    } catch(e) {
        return message.channel.send(`An error occured on ${command} :\n ${e.message}`);
    }
});
