const moment = require('moment');

module.exports = {
  name: "pause",
  aliases: ["resume"],
  execute(message, cmd, args) {

    const songQueue = message.client.queue.get(message.guild.id);
    const song = songQueue.songs[0]

    if (!message.member.voice.channel) {
      return message.channel.send('Mr.Hooman says he needs you to be in a channel to execute this command!');
    }

    if (!songQueue) {
      return message.channel.send(`There are no songs in queue 😔`);
    }


    if (cmd == "pause") {
      message.client.pauseTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      songQueue.connection.dispatcher.pause();
    }

    if (cmd == "resume") {
      var currentTime = moment(new Date());
      var pauseTime = moment(message.client.pauseTime, "YYYY-MM-DD HH:mm:ss");
      var pauseDuration = moment(currentTime).subtract(pauseTime);

      var startTime = moment(song.startTime, "YYYY-MM-DD HH:mm:ss");
      startTime = moment(startTime).add(pauseDuration).format("YYYY-MM-DD HH:mm:ss");

      queue.get(message.guild.id).songs[0].startTime = startTime.toString();
      songQueue.connection.dispatcher.resume();
    }

    message.channel.stopTyping();

  }
}