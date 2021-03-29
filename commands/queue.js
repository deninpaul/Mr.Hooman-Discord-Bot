module.exports = {
  name: "queue",
  aliases: [],
  execute(message, cmd, args) {

    const serverQueue = message.client.queue.get(message.guild.id);
    var queueString = "`";

    for (index in serverQueue.songs) {
      queueString += serverQueue.songs[index].title + "`,\n `"
      if(index == 50) break;
    }

    queueString += " `";
    message.channel.send(queueString);

  }
}