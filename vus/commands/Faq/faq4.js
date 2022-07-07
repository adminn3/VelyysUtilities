const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "faq4",
        execute(client, message, args) {
        //message.delete();
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
          

            const faqembed = new MessageEmbed()
            .setTitle("**#4: Is Daddy coping Sound's Utilities Bot/Sound's Server Bot??**")
            .setDescription(`The answer to that is: no. well not really. and the reason behind that Is because They are two different bot boys, two different coding programs running these magic things, And most Importantly two different developers. so no Sound's Utilities, is not being copied.`)
            .setColor("#ffc268")

            message.channel.send({ embeds: [faqembed] })


  }
}