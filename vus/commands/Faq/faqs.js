const { MessageEmbed } = require('discord.js')


module.exports = {
        name: "faqs",
  
        execute(client, message, args) {
        message.delete();
            if(!message.member.permissions.has('MANAGE_MESSAGES')) return;

            let faqEmbed = new MessageEmbed()
            .setTitle(`${message.guild.name} - FAQs:`)
            .setDescription(`Here is the list of the FAQs Commands.\n`)
            .addField(`How Do I become a moderator?`, "Use: `>faq1`")
            .addField(`Why can't I ping a moderator?`, "Use: `>faq2`")
            .addField(`How can I add Velyy's Utilities to my server?`, "Use: `>faq3`")
            .addField(` Is Daddy coping Sound's Utilities Bot/Sound's Server Bot??`, "Use: `>faq4`")
            .addField(`Why did I get warned?/[...] for something that isn't a rule?`, "Use: `>faq5`")
              .setFooter({ text: `If a FAQ Is not found/here please report this to sniper.`, iconURL: client.user.displayAvatarURL() })

            

            message.channel.send({ embeds: [faqEmbed] });


    }
}