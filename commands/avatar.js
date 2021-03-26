module.exports = {
    name: "avatar",
    aliases: [],
    execute(message, args) {
        const image = require("./../utils/strings.js");
        const newImage = image[args]; var flag = 0;
        try {
            message.client.user.setAvatar(newImage).then( () =>{
                message.channel.send(`I have been changed to a ${camelize(args[0])} Hooman`);
            });
        } catch (e) {
            message.channel.send("Oops! Mr.Hooman has caught up in a mood swing, thanks to your continuosly acts of changing his personality. Please leave him alone for a while 😤");
        }
    }
};

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}