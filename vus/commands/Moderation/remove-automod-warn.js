const { MessageEmbed } = require('discord.js');
const db = require('../../models/automodschema');

module.exports = {
    name: 'remove-automod-warn',
    aliases: ["raw"],
    utilisation: '{prefix}remove',

    execute(client, message, args) {
      
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLowerCase())


        const embed1 = new MessageEmbed()
          .setDescription("Please mention the user.")

        const embed2 = new MessageEmbed()
          .setDescription("Arguments must be a number. (Number from one of the user's automod warns)")

        const embed3 = new MessageEmbed()
          .setDescription("User has no automod strikes.")

        const embed4 = new MessageEmbed()
          .setDescription(`The warning has been removed.`)
      
        if (!user) return message.reply({ embeds: [embed1]})
        db.findOne({
            guild: message.guild.id, 
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                let number = parseInt(args[1]) - 1
                if (isNaN(number)) return message.reply({ embeds: [embed2]})
                data.content.splice(number, 1)
                message.reply({ embeds: [embed4]})
                data.save()
            } else {
                message.reply({ embeds: [embed3]})
            }
        }) 

    }
};