const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'unmute',
  aliases: ['um', 'unstfu', 'unbequiet'],
  description: 'unmutes a member.',
  usage: '>unmute <@user>',
  example: '>unmute @SniperCatJr',

  async execute(client, message, args) {

    const member = message.mentions.members.first();
    let target = message.guild.members.cache.get(member.id)
    const role = message.guild.roles.cache.find(r => r.name === 'Muted')

    target.roles.remove(role.id)
    const UnRekted = new MessageEmbed()
    .setColor("ffc268")
    .setDescription(`${target} has been **unmuted** \`${target.id}\``)

    message.reply({ embeds: [UnRekted] })
  }
}