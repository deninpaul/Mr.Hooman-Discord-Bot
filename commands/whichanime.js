const axios = require("axios");

module.exports = {
  name: "whichanime",
  aliases: ["whichani", "wa"],
  description: "Tell you about the anime in an image",
  execute(client, message, args, Discord) {
    console.log(args);
    message.channel.startTyping();

    axios.get("https://trace.moe/api/search?url=" + args[0])
      .then((res) => {
        console.log(res.data.docs[0].anime)
        message.channel.send(`Mr.Hooman thinks it's ${res.data.docs[0].title_english}!`)
      })
      .catch((e) => {
        console.log(e);
    })

    message.channel.stopTyping();
  }
}
