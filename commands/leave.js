module.exports = {
    name: "leave",
    aliases: ["l", " l", "exit", " exit", "stop", " stop"],
    async execute(message, args) {
        message.channel.startTyping();

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            return message.channel.send("Mr.Hooman needs you to be in the Voice Channel to stop the music!");
        }

        try{
            await voiceChannel.leave();
            await message.channel.send("Hope you had a great time with Mr.Hooman 👋!");
        } catch (e){
            essage.channel.send("Oops! Mr.Hooman is having trouble in leaving the Voice Channel.")
        }
        
        message.channel.stopTyping();
    }
}