const avatar = require("./avatar.js");
const image = require("./../utils/strings.js");

module.exports = {
    name: "ping",
    aliases: ["hello"],
    description: "this is a ping command!",
    execute(client, message, cmd, args, Discord) {
        message.channel.send('Mr.Hooman says pong!');
    }
}
