module.exports = {
    name: "avatar",
    aliases: [],
    execute(message, args) {
        const image = require("./../utils/strings.js");
        const newImage = image[args];
        message.client.user.setAvatar(newImage).then(() => {
            message.channel.send(`I have been changed to a ${camelize(args)} Hooman`)
        })

    }
};

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}