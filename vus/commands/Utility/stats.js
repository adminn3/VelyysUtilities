const db = require("quick.db");
const Discord = require ("discord.js")
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {
    name: "stats",
  execute(client, message, args, del, member) {
    

      const infoembed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Stats`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('				  **Uptime:**', `\`${ms(client.uptime)}\``, true)
            .addField('				  **WebSocket Ping:**', `\`${client.ws.ping}ms\``, true)
            .addField('				  **Memory:**', `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB Rss\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\``, true)
            .addField('				  **Node:**', `\`${process.version}\` on \`${process.platform}\` \`${process.arch}\``, true)//to make it work use ${process.verison}
            .addField('				  **Cached Data:**', `\`${client.users.cache.size}\` Users\n\`${client.emojis.cache.size}\` Emojis`, true)
            .addField('         **Developer**', 'SniperCatJr#7373', true)
            .addField('				 <:discordjs:964747505235542086> **Discord.js:**', `\`${discordjsVersion}\``, true)        //to use the djs version do: \`${discordjsVerison}\``
            .setTimestamp()
            .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send({ embeds: [infoembed] })
        
    }
}