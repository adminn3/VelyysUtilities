const { MessageEmbed } = require('discord.js');
const warndb = require('../../models/automodschema');
const { Info } = require('../../emojis.json')

module.exports = {
    name: 'automod-warnings',
    aliases: ["awarns"],
    utilisation: '{prefix}warnings',

    execute(client, message, args) {
      
        let user = message.mentions.members.first()

        const embedNoUser = new MessageEmbed()
          .setDescription("Please mention the user.")


        if(!user) return message.reply({ embeds: [embedNoUser] });
        if(user.permissions.has("ADMINISTRATOR")) {
            message.reply("Administrators can not have automod warnings.")
        } else {



        warndb.findOne({
            guild: message.guild.id, 
            user: user.id
        }, async (err, data) => {
            if (err) throw err
          
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n**ID: ${i + 1} |** **Moderator: Hidden**\n**Warn** - ${w.reason} \n`/*



To use another way do: const e = data.content.map(
                    (w, i) => `\n**ID:** ${i + 1} | **Moderator:** ${message.guild.members.cache.get(w.moderator).user.tag} (\`${message.guild.members.cache.get(w.moderator).user.id}\`)\n**Warn** - ${w.reason}\n`*/
                )
                const embed = new MessageEmbed()
                    .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL({ dynamic: true }))
                  
                    .setDescription(`All Automod Warns For ${user}.\n` + e.join(' '))
                    .setFooter("")
                    .setTimestamp()
                message.reply({
                    embeds: [embed]
                })
              
            } else {

                /*const noWarns = new MessageEmbed()
                  .setDescription(`${Info} There are no warnings.`)
              .setColor("BLURPLE")*/
              message.reply(`You/User have no automod strikes.`)

              
                //message.reply({ embeds: [noWarns] })
            } 
        })
    }

          
    },
};