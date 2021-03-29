const YoutubeMusicApi = require('youtube-music-api')

module.exports = {
  name: "autoqueue",
  aliases: ["autofill", "auto"],
  async execute(message, cmd, args) {

    const serverQueue = message.client.queue.get(message.guild.id);
    message.channel.startTyping();

    if (serverQueue) {
      const currentSong = serverQueue.songs[0].title;

      const api = new YoutubeMusicApi()
      const info = await api.initalize();

      //finding the playlist
      const result = await api.search(currentSong, "playlist");
      console.log(result);
      const playlist = await api.getPlaylist(result.content[0].browseId).catch((e) =>
        console.log(`The playlist length is: ${playlist.content.length}`)
      );

      //adding playlist songs to queue
      for (let index = 1; index < playlist.content.length; index++) {
        const song = {
          title: playlist.content[index].name,
          url: ("https://youtube.com/watch?v=" + playlist.content[index].videoId),
          thumbnail: playlist.content[index].thumbnails[0],
          duration: playlist.content[index].duration/1000,
          startTime: "",
          requested: message.author.username,
        };
        console.log(song)
        serverQueue.songs.push(song);
      }

      message.channel.stopTyping();
      message.channel.send(`👍 Added ${playlist.content.length} related tracks to the queue`);
    }

    //No queue case
    else {
      console.log("No Queue");
    }
  }
}
