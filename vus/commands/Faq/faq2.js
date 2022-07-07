const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "faq2",
        execute(client, message, args) {
        //message.delete();
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
          

            const faqembed = new MessageEmbed()
            .setTitle("**#2: Why can't I ping a moderator?**")
            .setDescription(`This is to reduce mass pinging a staff member. If you would like to contact a staff member please dm: <@575252669443211264>, or dm a staff member. *(Who allows DM's.)*`)
            .setColor("#ffc268")

            message.channel.send({ embeds: [faqembed] })


  }
}