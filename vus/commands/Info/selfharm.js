const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "suicide",
  aliases: ["selfharm", "suicide", "sui"],
  utilisation: '{prefix}suicide',
  
  async execute(client, message, args) {
    
    let embed = new Discord.MessageEmbed()
    .setAuthor({ name: "Suicide and Self-Harm Prevention" })
    .setTitle(`We want you to know you're never alone.`)
    .setDescription(`**[USA Suicide Hotline](https://suicidepreventionlifeline.org/)** \n Phone Number: 1-800-273-8255\n\n **[International Suicide Hotlines](https://www.opencounseling.com/suicide-hotlines)**\n These hotlines are made available to those that do not reside in the United States currently. Look up the number on the list thats correlates to your residency and call it. It will connect you to your countrys suicide hotline.`)
    .setColor('#ffc268')
    .setFooter({ text: `` })
    .setThumbnail('https://media.discordapp.net/attachments/912073926228729867/922628714959880263/768e030ea25565cb2327c5791c7dd71c3266ee85.gif')
    
    message.channel.send({ embeds: [embed] })
    
  
  }
}