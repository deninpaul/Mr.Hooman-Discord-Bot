module.exports = {
  name: "skip",
  aliases: ["next", " skip"],
  async execute(message, cmd, args) {

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel) {
      return message.channel.send('Mr.Hooman says he needs you to be in a channel to execute this command!');
    }
    
    if (!serverQueue) {
      return message.channel.send(`There are no songs in queue 😔`);
    }

    message.channel.stopTyping();
    serverQueue.connection.dispatcher.end();
  }
}