module.exports = {
    name: "play",
    aliases: ["p"],
    execute (message, args) {
        message.channel.startTyping();
        message.channel.send("Play command works");
        message.channel.startTyping();
    }
}