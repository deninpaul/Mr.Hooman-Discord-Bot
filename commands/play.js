const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
  name: "play",
  aliases: ["p", "play"],
  async execute(message, cmd, args) {

    //Checking if user is connected to Voice Channel
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send("Mr.Hooman is scared of being alone in a Voice Channel! Please join a Voice Channel before executing this command.");
    }

    //Check if Mr.Hooman has all the necessary perms
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send("Mr.Hooman says he doesn't have the CONNECT permissions 😥");
    } if (!permissions.has('SPEAK')) {
      return message.channel.send("Mr.Hooman says he can't SPEAK in the Voice Channel 😥.");
    }

    //This is our server queue. We are getting this server queue from the global queue.
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!args.length)
      return message.channel.send("Mr.Hooman can't read your mind! So add in a query after the PLAY Command!");

    //Typing indicator
    message.channel.startTyping();

    let song = {};

    //If the query is a link
    if (ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        thumbnail: songInfo.videoDetails.thumbnails[0],
        duration: songInfo.videoDetails.duration
      }
    }

     //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
    else {
      const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
      }
      const video = await videoFinder(args.join(' '));
      if (video) {
        song = {
          title: video.title,
          url: video.url,
          thumbnail: video.thumbnail,
          duration: video.duration,
        };
      } else {
        message.channel.send('"Oops! Mr.Hooman is having trouble finding your track. Please contact his therapist!"');
      }
    }

    //If the server queue does not exist, create one!
    if (!serverQueue) {

      const queueConstructor = {
        voiceChannel: voiceChannel,
        textChannel: message.channel,
        connection: null,
        songs: []
      }

      //Add our key and value pair into the global queue. We then use this to get our server queue.
      message.client.queue.set(message.guild.id, queueConstructor);
      queueConstructor.songs.push(song);

      //Establish a connection and play the song
      try {
        const connection = await voiceChannel.join();
        queueConstructor.connection = connection;
        videoPlayer(message.guild, queueConstructor.songs[0]);
      } catch (err) {
        message.client.queue.delete(message.guild.id);
        message.channel.send("Oops! Mr.Hooman is having trouble playing your music. Please contact his therapist!");
        console.log(err);
      }
    } else {
      serverQueue.songs.push(song);
      message.channel.stopTyping();
      return message.channel.send(`👍 **${song.title}** added to queue!`);
    }

    //Stop tying indicator
    message.channel.stopTyping();
  }
}

//Let's Mr.Hooman Play songs
const videoPlayer = async (guild, song) => {

  queue = guild.client.queue;
  const songQueue = queue.get(guild.id);

  if (!song) {
    songQueue.voiceChannel.leave();
    guild.client.queue.delete(guild.id);
    return;
  }

  const stream = ytdl(song.url, { filter: 'audioonly' });
  songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
      songQueue.songs.shift();
      videoPlayer(guild, songQueue.songs[0]);
    });

  await songQueue.textChannel.send(`👍 Now Playing **${song.title}**`)
}