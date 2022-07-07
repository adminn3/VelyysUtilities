const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "faq1",
        execute(client, message, args) {
        //message.delete();
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
          

            const faqembed = new MessageEmbed()
            .setTitle("**#1: How do I become a moderator?**")
            .setDescription(`\nTo become a staff member, you must apply through our staff application. The form is available in <#920692214055706675> when we require more staff, and you'll usually require around Lvl 5+ to view it.`)
            .setColor("#ffc268")

            message.channel.send({ embeds: [faqembed] })


  }
}