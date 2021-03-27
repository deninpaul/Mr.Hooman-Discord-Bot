const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: "play",
    aliases: ["p", " p", " play"],
    async execute(client, message, args, Discord) {

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
        } if (!args.length) {
            return message.channel.send("Mr.Hooman can't read your mind! So add in a query after the PLAY Command!")
        }

        //Typing indicator
        message.channel.startTyping();

        //Playing by given URL
        if (ytdl.validateURL(args[0])) {
            try {
                const connection = await voiceChannel.join();
                const stream = ytdl(args[0], { filter: 'audioonly' });

                connection.play(stream, { seek: 0, volume: 1 })
                    .on('finish', () => {
                        voiceChannel.leave();
                        message.channel.send('leaving channel');
                    });

                var info = await ytdl.getInfo(args[0]);
                await message.channel.send(`:thumbsup: Now Playing ***${info.videoDetails.title}***`)
            } catch (e) {
                console.log(e)
                message.channel.send("Oops! Mr.Hooman is having trouble playing the music. Please contact his therapist!");
            } finally {
                message.channel.stopTyping();
                return;
            }
        }

        //Play by searching through a query
        try {
            const connection = await voiceChannel.join();
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));

            if (video) {
                const stream = ytdl(video.url, { filter: 'audioonly' });
                connection.play(stream, { seek: 0, volume: 1 })
                    .on('finish', () => {
                        voiceChannel.leave();
                    });
                await message.reply(`👍 Now Playing ***${video.title}***`);
            } else {
                message.channel.send("Mr.Hooman couldn't find any video 😥");
            }
        } catch (e) {
            message.channel.send("Oops! Mr.Hooman is having trouble playing the music. Please contact his therapist!");
        } finally {
            message.channel.stopTyping();
            return;
        }
    }
}