const { MessageEmbed } = require('discord.js');
const warndb = require('../../models/warndb');
const automodDb = require('../../models/automodschema')
const { Info } = require('../../emojis.json')

module.exports = {
    name: 'warnings',
    aliases: ["warns"],
    utilisation: '{prefix}warnings',

    execute(client, message, args) {
      
        let user = message.mentions.members.first()

        const embedNoUser = new MessageEmbed()
          .setDescription("Please mention the user.")


        if(!user) return message.reply({ embeds: [embedNoUser] });
        if(user.permissions.has("ADMINISTRATOR")) {
            message.reply("Administrators cant have warnings.")
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
                  
                    .setDescription(`All Warns For ${user}.\n` + e.join(' '))
                    .setFooter("")
                    .setTimestamp()
                message.reply({
                    embeds: [embed]
                })
              
            } else {

                /*const noWarns = new MessageEmbed()
                  .setDescription(`${Info} There are no warnings.`)
              .setColor("BLURPLE")*/
              const automod = args[0].toLowerCase();
        
              
              
                automodDb.findOne({
                    guild: message.guild.id,
                    user: user.id,
                }, async(err, data) => {
                    if(err) throw err
                    if(data) {
                        if(automod === '-a') {
                            const e = data.content.map(
                                (w, i) => `\n**ID: ${i + 1} |** **Moderator:** Hidden\n**Warn** - ${w.reason} \n`
                            )
                            const ee = new MessageEmbed()
                            .setAuthor({ name: user.user.tag, iconURL: user.user.displayAvatarURL({ dynamic: true })})
                            .setDescription(`All automod warns for ${user}.\n` + e.join(' '))
                            .setTimestamp()
                            message.reply({
                                embeds: [ee]
                            })
                            
                        }
                    
                    } else {
                        message.reply('There are no automod strikes.')
                    }
                  
                })
            }
               
                //message.reply({ embeds: [noWarns] })
            })
        };
    },
};