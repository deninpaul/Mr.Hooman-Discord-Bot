// Stuff Mr.Hooman requires
const Discord = require('discord.js');
const config = require("./utils/config.js");
const client = new Discord.Client();

// Initialzing global variables in Mr.Hooman
client.login(config.token_bot);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map(); 
client.pauseTime = "";

//Mr.Hooman is loading files
['command_handler', 'event_handler'].forEach( handler => {
    require(`./handlers/${handler}`)(client, Discord);
});