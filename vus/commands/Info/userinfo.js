const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'userinfo',
  aliases: ['info'],
  description: 'Displays the users info',
  async execute(client, message, args, Discord) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Info`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      {
        name: 'Name',
        value: member.user.username,
      },
      {
        name: 'Server Nickname',
        value: member.displayName || 'None'
      },
      {
        name: 'Discriminator',
        value: `#${member.user.discriminator}`,
      },
      {
        name: 'User ID',
        value: member.user.id,
      },
      {
        name: 'Creation Date',
        value: member.user.createdAt.toLocaleDateString("en-us"),
      },
      {
        name: 'Joined Date',
        value: member.joinedAt.toLocaleDateString("en-us"),
      },
      {
        name: `Roles [${member.roles.cache.map(role => role.toString()).length}]`,
        value: member.roles.cache.map(role => role.toString()).join(', '),
      }
    )

    await message.channel.send({ embeds: [embed]})
  }
}