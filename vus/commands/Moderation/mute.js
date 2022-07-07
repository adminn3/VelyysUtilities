const { Client, Message, MessageEmbed, MessageActionRow } = require('discord.js')
const { check } = require('../../emojis.json')
const ms = require('ms')

module.exports = {
  name: 'mute',
  aliases: ['m', 'stfu', 'bequiet'],
  description: 'Mutes a member for a certain given time.',
  usage: '>mute <@user> <time> [reason]',
  example: '>mute @SniperCatJr 5m Stop spamming.',

  async execute(client, message, args) {

    const member = message.mentions.members.first();
    let time = args[1]
    let reason = args.slice(2).join(" ")
    const role = message.guild.roles.cache.find(r => r.name === 'Muted')

    if(!member) return message.reply("Please specify a user.")
    if(!time) return message.reply("Please specify a time.")
    if(!reason) reason = "No reason."

    if(member.id === message.author.id) return message.reply("You can't mute yourself.")
    if(member.id === client.id) return message.reply("lol no")

    if(!role) {
      try {
        message.channel.send('No muted role found... Making one..')
        let muterole = await message.guild.roles.create({
          data: {
            name: 'Muted',
            permissions: [],
          }
        })
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
        });
        message.channel.send(
          new MessageEmbed()
          .setDescription(`${check} Muted Role Has Been Created.`)
          .setColor("10b981")
        )
      } catch(err) {
        console.log(err)
      }
    };
    let role2 = message.guild.roles.cache.find(r => r.name === 'Muted')
    if (member.roles.cache.has(role2)) return message.reply("Member is already muted.")

    if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply("This member is having the same level or higher in permissions than you.")

    await member.roles.add(role2)
     const Rekt = new MessageEmbed()
     .setColor("ffc268")
     .setDescription(`${member} has been **muted** **|** \`${member.id}\``)

     message.reply({ embeds: [Rekt] })

     setTimeout(() => {
       member.roles.remove(role2)
     }, ms(time))


    }
  
}