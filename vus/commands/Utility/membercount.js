const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'membercount',
  aliases: 'mbc',
  utilisation: '{prefix}membercount',

  async execute(client, message, args, prefix) {
    if(!message.content.startsWith(prefix)) return
    const mbcEmbed = new MessageEmbed()
    .setAuthor(`Member Count`, client.user.displayAvatarURL({ dynamic: true }))
    .setColor("10b981")
    .setDescription(`There are **${message.guild.memberCount}** members in this server.\n**Humans:** ${message.guild.members.cache.filter(member => !member.user.bot).size}\n**Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}`)

    await message.channel.send({ embeds: [mbcEmbed] })
  }
}