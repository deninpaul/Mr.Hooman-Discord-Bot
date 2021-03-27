module.exports = {
    name: "setmood",
    aliases: ["mood", "botavatar"],
    execute(message, cmd, args) {
        message.channel.startTyping();

        const image = require("./../utils/strings.js");
        const newImage = image[args]; var flag = 0;

        message.client.user.setAvatar(newImage)
            .then(() => {
                message.channel.send(`Mr.Hooman says he's now a ${camelize(args[0])} Hooman`);
            })
            .catch((e) => {
                console.log(e);
                message.channel.send("Mr.Hooman is tired of your continuosly acts of changing his Avatar. Please leave him alone for a while 😤");
            });

        message.channel.stopTyping();
    }
};

function camelize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
