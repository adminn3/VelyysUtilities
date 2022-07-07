const Discord = require('discord.js')

module.exports = {
  name: 'lock',

  execute(client, message, args) {
    
    const reason = args.join(' ') || "Channel Locked."
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return;
    }

    const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

    message.channel.permissionOverwrites.edit(everyone, {
      SEND_MESSAGES: false
    })

    const lockedOutBois = new Discord.MessageEmbed()
        .setColor('ffad00')
        .setAuthor({ name: 'Channel Locked', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`The channel has been locked by a staff member. You are not muted. More information will be sent here eventually.`)
        .addFields(
          { name: 'Reason', value: reason },
        );
    message.channel.send({ content: `Locking Channel....`, embeds: [lockedOutBois] })
  }
}
