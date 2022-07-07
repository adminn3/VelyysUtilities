const { MessageEmbed } = require("discord.js");
const prefix = '>';

module.exports = {
    name: 'timeout',
    aliases: ["tmute", "tm", "t"],
    utilisation: '{prefix}timeout',

    async execute(client, message, args) {
      //let reason = args.slice(2).join(' ') 

      const fetch = require('node-fetch');
      const ms = require('ms');

      
        const user = message.mentions.users.first();
        
        
        /*const embed = new MessageEmbed()
        .setTitle(`Command: ${prefix}timeout`)
        .setDescription(`\`<> = Required [] = Optional.\`\n**Description:** Puts a user in timeout.\n**Usage:** ${prefix}timeout <user> <time> [reason]\n**Example:** >timeout @SniperCatJr 2m stop spamming.`)*/


        const embed1 = new MessageEmbed()
          .setDescription("Please provide the user.")

        
        const embed2 = new MessageEmbed()
          .setDescription("Please specify the time.")


        const embed3 = new MessageEmbed()
          .setDescription("Please specify the time between **10 seconds** (10s) and **28 days** (28d).")

//if(!args[0]) return message.channel.send({ embeds: [embed] })
        if(!user) return message.reply({ embeds: [embed1], ephemeral: true });

        
        const time = args.slice(1).join(' ');

        if(!time) return message.reply({ embeds: [embed2], ephemeral: true });
        

        const milliseconds = ms(time);

        if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) return message.reply({ embeds: [embed3], ephemeral: true });
        

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

		    await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			    method: 'PATCH',
		      body: JSON.stringify({ communication_disabled_until: iosTime }),
		      headers: {
				    'Content-Type': 'application/json',
				    'Authorization': `Bot ${client.token}`,
			    },
		    });
        const mutedEm = new MessageEmbed()
          .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setColor("ffc268")
        .setTitle(`You've been muted in ${message.guild.name}`)
        .addField('Reason', `There is no real reason to add a reason to a timeout. this note will be deleted soon.`)
          .addField('Expires', `${time}`)
              .setFooter(``)
              .setTimestamp();
   
              try {
                  user.send({ embeds: [mutedEm] })
   
              } catch(err) {
   console.log(err)
            }
        setTimeout(function () {
        const mutecleared = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('10b981')
        .setTitle(`You've been unmuted in ${message.guild.name}`)
        .addField('Reason', `[Auto] Mute Cleared`)
        .setFooter(``)
        .setTimestamp();
        user.send({ embeds: [mutecleared] })
    }, ms(args[1]));

        const embed4 = new MessageEmbed()
          .setDescription(`${user} has been **timed out** **|** \`${user.id}\``)
          .setColor("ffc268");

        message.channel.send({ embeds: [embed4] })

      
          
    },
};