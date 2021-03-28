module.exports = {
  name: "leave",
  aliases: ["stop", "clear", "exit"],
  execute(message, cmd, args) {

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel) {
      message.channel.stopTyping();
      return message.channel.send('Mr.Hooman says he needs you to be in a channel to execute this command!');
    }

    serverQueue.songs = [];
    message.channel.send("Hope you had a great time with Mr.Hooman 👋!");
    serverQueue.connection.dispatcher.end();
  }
}