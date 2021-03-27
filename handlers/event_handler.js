const fs = require('fs');

module.exports = (client, Discord) => {
  const event_files = fs.readdirSync(`./events/`).filter(
    file => file.endsWith('.js')
  );

  //adding events from the files    
  for (const file of event_files) {
    console.log(`Loaded ${file}`);
    const event = require(`../events/${file}`);
    const event_name = file.split('.')[0]
    client.on(event_name, event.bind(null, Discord, client));
  }
}

