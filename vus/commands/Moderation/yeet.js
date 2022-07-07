const { MessageEmbed } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "yeet",
    aliases: ['y'],
    description: "YeET aLl SeRVeR MemBErS!!1!!!1!",
    usage: ">yeet",
    async execute(client, message, args) {

      if(message.member.permissions.has("MANAGE_MESSAGES")) {

      let filter = (m) => m.author.id === message.author.id; 

      const check1Embed = new MessageEmbed()
        .setDescription("Are you sure about that?")
        .setColor('#ef4444');

      message.reply({ embeds: [check1Embed] });
      
      let check1 = await message.channel.awaitMessages({
           filter: filter,
           max: 1
       });

      const msg1 = check1.first().content;

      if(msg1.toLowerCase() === "no") return message.reply("Alright, command cancelled.")
        
      const check2Embed = new MessageEmbed()
        .setDescription("So you want me to ban them, CORRECT?")
        .setColor('#ef4444');

      message.reply({ embeds: [check2Embed] });

      let check2 = await message.channel.awaitMessages({
           filter: filter,
           max: 1
       });

      const msg2 = check2.first().content;

      if(msg2.toLowerCase() === "no") return message.reply("Bruh, I was going to ban them. smh")

      const embedLoading = new MessageEmbed()
        .setDescription(`Loading...`)
        .setColor("RED");

      message.channel.send({ embeds: [embedLoading] }).then(async Message => {

        await wait(1000);

        const embed1 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (0%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed1] });

        await wait(3000);

        const embed2 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (12%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed2] });

        await wait(3000);

        const embed3 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (35%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed3] });

        await wait(3000);

        const embed4 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (47%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed4] });

        await wait(3000);

        const embed5 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (69%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed5] });

        await wait(3000);

        const embed6 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (78%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed6] });

        await wait(3000);

        const embed7 = new MessageEmbed()
          .setDescription(`Yeeting ${message.guild.memberCount} members... (99%)`)
          .setColor("RED");

        Message.edit({ embeds: [embed7] });

        await wait(3000);

        message.channel.send("Skull issues, i can't ban the owner. So, this command has failed \:skull:");

      })
        
      } else {
        message.delete();
      }
        
    },
};