// Stuff Mr.Hooman requires
const Discord = require('discord.js');
const config = require("./utils/config.js");
const client = new Discord.Client();

client.login(config.token_bot);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map(); 

// Initialzing variables in Mr.Hooman
['command_handler', 'event_handler'].forEach( handler => {
    require(`./handlers/${handler}`)(client, Discord);
});