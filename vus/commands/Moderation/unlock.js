const Discord = require('discord.js')

module.exports = {
  name: 'unlock',

  execute(client, message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return;
    }
    
    const reason = args.join(' ') || "Channel Unlocked."
    

    const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

    message.channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: true
    })

    const unlockedOutBois = new Discord.MessageEmbed()
        .setColor('ffad00')
        .setAuthor(`Channel Unlocked`, client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`The channel has be unlocked, you may start chatting again.`)
    .addField('Reason', reason)
    message.channel.send({ embeds: [unlockedOutBois] })
  }
}
