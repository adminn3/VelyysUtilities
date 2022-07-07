const { MessageEmbed } = require("discord.js");
const ms = require('ms');
const { yes } = require('../../emojis.json')

module.exports = {
    name: 'slowmode',
   // aliases: ["sm"],
    utilisation: '{prefix}slowmode',

    execute(client, message, args) {

      const embed1 = new MessageEmbed()
        .setDescription("Please provide the time for slowmode.")

      
      const embed2 = new MessageEmbed()
        .setDescription("Please specify a number.")


      const embed4 = new MessageEmbed()
        .setDescription(`Slowmode cannot be Negative.`)

      
    


      const embedError = new MessageEmbed()
        .setDescription(`An error has occured while executing the command. Make sure that I have the administrator permission.`)


      
      if (!args[0]) return message.reply({ embeds: [embed1]});
      
      if (isNaN(args[0])) return message.reply({ embeds: [embed2]});

      // Somehow, when you use ">sm 0", it doesn't set the slowmode to 0 seconds. So here is the slowmode set 0 sec force code:
      if(args[0] == 0) return message.reply(`Slowmode has been disabled.`).then( message.channel.setRateLimitPerUser(null).catch(err => message.channel.send({ embeds: [embedError], ephemeral: true})) )

      if(args[0] < 0) return message.reply({ embeds: [embed4], ephemeral: true});
    
      message.channel.setRateLimitPerUser(args[0]).catch(err => message.channel.send({ embeds: [embedError], ephemeral: true}));
        
      message.reply(`Slowmode set to \`${args[0]}\` seconds.`);

      
          
    },
};