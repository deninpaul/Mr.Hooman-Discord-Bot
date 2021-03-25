const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.token)

bot.on("ready", function() {
    console.log(`${bot.user.username} is Online!`)
});