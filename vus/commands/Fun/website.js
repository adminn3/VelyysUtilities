const Discord = require("discord.js");
const { Infosymbol } = require('../../emojis.json')

module.exports = {
  name: "website",
  execute(client, message, args) {
    
    let embed = new Discord.MessageEmbed()
    .setTitle(``)
   .setDescription(`${Infosymbol} Did you know Poggie Woggie has a [website?](https://suk1szlr9nmwzn0lj9hlsg-on.drv.tw/sniper.wtf/sniper.wtf/)`)
    .setColor('ffc268')
    .setFooter(``)
    message.channel.send({ embeds: [embed] })
    
  
  }
}