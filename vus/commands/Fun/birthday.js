const discord = require("discord.js");

module.exports = {
  name: "birthday",
  execute(client, message, args) {
    
    let embed = new discord.MessageEmbed()
    .setTitle(``)
   .setDescription('<:infosymbol:956536798111219822> I was born on Oct 31th, 2021!')
    .setColor('ffc268')
    message.channel.send({ embeds: [embed] })
    
  
  }
}