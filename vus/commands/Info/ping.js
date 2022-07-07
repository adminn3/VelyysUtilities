const Discord = require("discord.js"); // define discord to use embeds
const ms = require('ms');
module.exports = {
  name: 'ping',
  aliases: 'p',

  async execute(client, message, args) { 
    var timeNow = Date.now();
    var m = await message.channel.send('Pinging...');
    var messageLat = Date.now()-timeNow;
    var ping = ms(client.uptime);

    let e = new Discord.MessageEmbed()
    .addField("Server <- Discord", `${Math.round(client.ws.ping)}ms`, true)
    .addField("Server -> Discord", `${messageLat}ms`, true)
    .addField("Uptime", ping)
    m.edit({ embeds: [e] });

  }
}
