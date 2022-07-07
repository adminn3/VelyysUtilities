const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "faq3",
        execute(client, message, args) {
        //message.delete();
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
          

            const faqembed = new MessageEmbed()
            .setTitle("**#3: How can I add Velyy's Utilities to my server?**")
            .setDescription(`Unfortunately this is a privately-owned custom bot, and it cannot operate in other servers, but some good moderation bots you could use are Auttaja or Dyno.`)
            .setColor("#ffc268")

            message.channel.send({ embeds: [faqembed] })


  }
}