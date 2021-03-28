const moment = require('moment');

module.exports = {
  name: "nowplying",
  aliases: ["np", "now"],
  async execute(message, cmd, args) {

    const songQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel) {
      return message.channel.send('Mr.Hooman says he needs you to be in a channel to execute this command!');
    }
    
    if (!songQueue) {
      return message.channel.send(`There are no songs playing right now 😔`);
    }

    const song = songQueue.songs[0];
    const endTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const startTime = moment(song.startTime, "YYYY-MM-DD HH:mm:ss")
    const duration = moment(endTime).subtract(startTime).seconds();
    const minDuration = Math.floor(duration/60);
    const secDuration = duration%60;
    console.log(duration);
  
    message.channel.send(`${song.title} Time: ${minDuration}:${secDuration}`)
    message.channel.stopTyping();
  }
}