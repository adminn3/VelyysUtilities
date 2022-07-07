const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'serverlist',
  aliases: ['slist'],
  description: 'Displays a list of servers the bot is in',
  async execute(client, message) {
    let description = 
    `Total Servers: ${client.guilds.cache.size}\n\n` + client.guilds.cache
    .sort((a, b) => b.memberCount - a.memberCount)
    .map(r => r)
    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members | ID: ${r.id}`)
    .slice(0, 10)
    .join('\n')

    const embed = new MessageEmbed()
    .setAuthor({ name: "Guilds", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(description) // we did it this way because its less confusing

    message.channel.send({ embeds: [embed] })
  }
}