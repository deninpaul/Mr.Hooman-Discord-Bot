// Stuff Mr.Hooman requires
const Discord = require('discord.js');
const config = require("./utils/config.js");
const client = new Discord.Client();

client.login(config.token_bot);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Initialzing variables in Mr.Hooman
['command_handler', 'event_handler'].forEach( handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

/*
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require('./utils/config.js');
const jsCommandFiles = fs.readdirSync('./commands/').filter(
    file => file.endsWith('.js')
);


// Shipping features to Mr.Hooman
for (const file of jsCommandFiles) {
    console.log(`Loaded ${file}`);
    const pull = require(`./commands/${file}`);

    if (pull.name) {
        client.commands.set(pull.name, pull);
        pull.aliases.forEach(alias => {
            client.aliases.set(alias, pull.name);
        });
    }
}


// Mr.Hooman is getting ready
client.once('ready', () => {
  });


// Mr.Hooman is up and ready at your service
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (!commandFile) return;

    try {
        commandFile.execute(message, args);
    } catch (e) {
        return message.channel.send(`An error occured on ${command} :\n ${e.message}`);
    }
});

*/