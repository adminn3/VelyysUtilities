const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'purge',
    aliases: ["sweep", "clear", "p"],
    utilisation: '{prefix}purge',

    execute(client, message, args) {

      
      const embed1 = new MessageEmbed()
        .setDescription("Please specify the amount.")


      const embed2 = new MessageEmbed()
        .setDescription("Please specify the amount between **1** and **100**.")


      const embedError = new MessageEmbed()
        .setDescription("can't delete messages that has been sent more than 14 days ago.")

      
      const amount = parseInt(args[0])

        if (!amount) return message.reply({ embeds: [embed1], ephemeral: true })
      
        if (amount > 100 || amount < 1) return message.reply({ embeds: [embed2], ephemeral: true })

        message.channel.bulkDelete(amount).catch(err => { message.reply({ embeds: [embedError], ephemeral: true }) })

        const embedDone = new MessageEmbed()
          .setDescription(`Successfully Deleted \`${amount}\` Messages.`)

        message.channel.send({ embeds: [embedDone] })

      
          
    },
};