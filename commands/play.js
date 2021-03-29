const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const moment = require('moment');
const embed = require('../utils/embeds.js');

module.exports = {
  name: "play",
  aliases: ["p", "play"],
  async execute(message, cmd, args) {

    const voiceChannel = message.member.voice.channel;

    //Checking if user is connected to Voice Channel
    if (!voiceChannel) {
      return message.channel.send(embed.CONNECT_VOICE_MESSAGE);
    }

    //Check if Mr.Hooman has all the necessary perms
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send(embed.MISSING_CONNECT_PERM_MESSAGE);
    } if (!permissions.has('SPEAK')) {
      return message.channel.send(embed.MISSING_VOICE_PERM_MESSAGE);
    }

    //This is our server queue. We are getting this server queue from the global queue.
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!args.length)
      return message.channel.send(embed.MISSING_QUERY_MESSAGE);

    //Typing indicator
    message.channel.startTyping();

    let song = {};

    //If the query is a link
    if (ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        thumbnail: songInfo.videoDetails.thumbnails[0].url,
        duration: parseInt(songInfo.videoDetails.lengthSeconds),
        startTime: "",
        requested: message.author.username,
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
          duration: video.seconds,
          startTime: "",
          requested: message.author.username,
        };
      } else {
        message.channel.send(embed.ERROR_PLAYING_MESSAGE);
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
        message.channel.send(embed.ERROR_PLAYING_MESSAGE);
        console.log(err);
      }
    } else {
      serverQueue.songs.push(song);
      message.channel.stopTyping();
      return message.channel.send(embed.ADDED_QUEUE_MESSAGE(song));
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
    queue.delete(guild.id);
    return;
  }

  const stream = await ytdl(song.url, { filter: 'audioonly' });
  await songQueue.connection.play(stream, { seek: 0, volume: 1 })
    .on('finish', () => {
      songQueue.songs.shift();
      videoPlayer(guild, songQueue.songs[0]);
    });

  //Add start time to the song to calculate elapsed time later
  const currentTime = await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  if (queue.get(guild.id).songs[0])
    queue.get(guild.id).songs[0].startTime = currentTime.toString();

  await songQueue.textChannel.send(embed.NOW_PLAYING_MESSAGE(guild, song));
}