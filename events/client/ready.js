module.exports = (Discord, client, message) => {
    console.log('Mr.Hooman is online!');
    client.user.setPresence({ activity: { name: `with Hoomans`, type: "PLAYING" } });
}