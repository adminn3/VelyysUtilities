const { MessageEmbed } = require('discord.js');
const warndb = require('../../models/warndb');

module.exports = {
    name: 'warn',
    aliases: ["w"],
    utilisation: '{prefix}warn',

    execute(client, message, args) {
      
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    
        const embed1 = new MessageEmbed()
          .setDescription("Please mention the user.")
      
        if (!user) return message.reply({ embeds: [embed1]})
      
        let reason = args.slice(1).join(" ")
      
        if(!reason) reason = "No reason"

        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator: message.author.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        })

        const embed3 = new MessageEmbed()
          .setDescription(`${user} has been **warned** **|** \`${user.id}\``)
          .setColor("ffc268");

        const embedDM = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle(`You've been warned in ${message.guild.name}`)
          .addFields(
            { name: "Reason", value: reason },
            { name: "Expires", value: "4 weeks 2 days" }
          )
          .setColor("ffc268")
          .setTimestamp()

        message.channel.send({ embeds: [embed3]})

        const embedError = new MessageEmbed()
          .setDescription(`${user} has been **warned**, But they didn't received a DM message.`)
          .setColor("RED");
          
        user.send({ embeds: [embedDM]}).catch(err => console.log("[Error] ", err))
          
    },
};