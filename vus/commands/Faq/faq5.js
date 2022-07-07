const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "faq5",
        execute(client, message, args) {
        //message.delete();
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
          

            const faqembed = new MessageEmbed()
            .setTitle("**#5: Why did I get warned?/ [...] for something that isn't a rule?**")
            .setDescription(`To check why you got warned, view your DMs with the bot or use \`>warnings\` in <#890684045913120778>. Not all rules are listed in <#895052981265924146>.`)
            .setColor("#ffc268")

            message.channel.send({ embeds: [faqembed] })


  }
}