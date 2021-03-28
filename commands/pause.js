const moment = require('moment');
var pauseTime;

module.exports = {
  name: "pause",
  aliases: ["resume"],
  async execute(message, cmd, args) {

    const songQueue = message.client.queue.get(message.guild.id);
    const song = songQueue.songs[0]

    if (!message.member.voice.channel) {
      return message.channel.send('Mr.Hooman says he needs you to be in a channel to execute this command!');
    }

    if (!songQueue) {
      return message.channel.send(`There are no songs in queue 😔`);
    }


    if (cmd == "pause") {
      pauseTime = await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      songQueue.connection.dispatcher.pause();
    }

    if (cmd == "resume") {
      var currentTime = await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      var startTime = moment(song.startTime, "YYYY-MM-DD HH:mm:ss")
      var pauseDuration = moment(currentTime).subtract(pauseTime);
      
      startTime = moment(startTime).subtract(pauseDuration);
      queue.get(message.guild.id).songs[0].startTime = currentTime.toString();
      songQueue.connection.dispatcher.resume();
    }

    message.channel.stopTyping();

  }
}