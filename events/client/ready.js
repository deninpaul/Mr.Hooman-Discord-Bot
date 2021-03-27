module.exports = (Discord, client, message) => {
    console.log('Mr.Hooman is online!');
    require('http').createServer((req, res) => res.end('Behold! Mr.Hooman is alive!')).listen(3000)
    client.user.setPresence({ activity: { name: `with Hoomans`, type: "PLAYING" } });
}