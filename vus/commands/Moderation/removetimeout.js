const { moderatorRoleId } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'remove-timeout',
    aliases: ["rtmute", "rtm"],
    utilisation: '{prefix}rtimeout',

    async execute(client, message, args) {

      const fetch = require('node-fetch');
      const ms = require('ms');

      
      
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;

        const embed1 = new MessageEmbed()
          .setDescription("Please provide the user.")
          .setColor("RED");

          const noBot = new MessageEmbed()
          .setAuthor({ name: 'Error!', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setColor("ef4444")
          .setDescription(`[Error Code: Remove Timeout From A bot]\nBots can not have a timeout nor have it removed.`)

        if(!user) return message.reply({ embeds: [embed1] });
        if(user === message.mentions.members.first().bot); 

        const milliseconds = ms("0s"); // Just set this to "0s" to remove the timeout, not hard XD.

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

		    await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			    method: 'PATCH',
		      body: JSON.stringify({ communication_disabled_until: iosTime }),
		      headers: {
				    'Content-Type': 'application/json',
				    'Authorization': `Bot ${client.token}`,
			    },
		    });

        const embed4 = new MessageEmbed()
          .setDescription(`${user}(s) **timeout** has been stopped. **|** \`${user.id}\``)
          .setColor("10b981");

        message.channel.send({ embeds: [embed4] })

      
          
    },
};