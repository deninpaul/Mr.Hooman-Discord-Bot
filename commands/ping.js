const avatar = require("./avatar.js");
const image = require("./../utils/strings.js");

module.exports = {
    name: "ping",
    aliases: ["hello"],
    description: "this is a ping command!",
    execute(message, cmd, args) {
        message.channel.send(`Mr.Hooman said pong after ${message.client.ws.ping}ms!`);
    }
}
