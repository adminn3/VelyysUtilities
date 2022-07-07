const { MessageEmbed } = require('discord.js');
const db = require('../../models/warndb');

module.exports = {
    name: 'removewarn',
    aliases: ["rw"],
    utilisation: '{prefix}removewarn',

    execute(client, message, args) {
      
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase())


        const embed1 = new MessageEmbed()
          .setDescription("Please mention the user.")
          .setColor("RED");

        const embed2 = new MessageEmbed()
          .setDescription("Arguments must be a number. (Number from one of the user's warns)")
          .setColor("RED");

        const embed3 = new MessageEmbed()
          .setDescription("User Does not have any warnings.")
          .setColor("RED");

        const embed4 = new MessageEmbed()
          .setDescription(`The warning has been removed.`)
          .setColor("GREEN");
      
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