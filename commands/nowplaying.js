const embed = require('../utils/embeds.js');

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
    
    const song = songQueue.songs[0]
    songQueue.textChannel.send(embed.NOW_PLAYING_MESSAGE(message.guild, song));
    message.channel.stopTyping();
  }
}