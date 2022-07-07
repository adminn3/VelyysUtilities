const ms = require('ms')
const { Message, Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
  name: 'unban',
  aliases: 'ub',

  async execute(client, message, args, Discord) {
    const member = await client.users.fetch(args[0]);
    //const yes = 'https://cdn.discordapp.com/emojis/800062978899836958.gif?size=44&quality=lossless'
  

  const userId = args[0]

    if(!userId) return message.reply('Please state an ID.')

    if(isNaN(userId)) return message.reply('The ID should be an Integer.')

    const bannedMembers = await message.guild.bans.fetch()

    if(!bannedMembers.find((user) => user.user.id === userId)) return message.reply('The user is not banned.')
    
    if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('lol no')

  /*if(!args[0]) return message.reply(`Please state the member.`)*/


    const row = new MessageActionRow()
      
      .addComponents(

    new MessageButton()
      .setStyle('SUCCESS')
      .setCustomId('unbanyes')
      .setLabel('Yes'),

      new MessageButton()
      .setStyle('DANGER')
      .setCustomId('unbanno')
      .setLabel('No'),
      
      
    )

    let unbanaskEmbed = new MessageEmbed()
    .setColor("ffc268")
    .setTitle("Do you want to proceed?")
    .setDescription(`<:rightDoubleArrow:917174788701687822>**Target:**\n<:space:914705915448528937> ${member.tag}`)
    .setFooter(`Click on either "Yes" or "No" to confirm! you have 10 seconds.`)

    let unbanEndEmbed = new MessageEmbed()
    .setDescription("Command Expired.")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = 'No reason.';

    let unbannedembed = new MessageEmbed()
      .setColor("BLUE")
    .setDescription(`**${member.tag}** has been unbanned.`)

    let cancelled = new MessageEmbed()
    .setColor("ff4242")
    .setDescription(`Action Cancelled.`)

    const unbanPage = await message.reply({ embeds: [unbanaskEmbed], components: [row] })

    const col = await unbanPage.createMessageComponentCollector({
      componentType: "BUTTON",
      time: ms ('10s'),
    })

    col.on('collect', i => {

    if (i.user.id !== message.author.id) return

    if (i.customId === 'unbanyes') {
      message.guild.members.unban(userId)

      

      unbanPage.edit({ embeds: [unbannedembed], components: [] })
    } 

      else if(i.customId === 'unbanno') {
     
      unbanPage.edit({ embeds: [cancelled], components: [] })
      
    } 
      
      
    })

    col.on('end', () => {

      unbanPage.edit({ embeds: [unbanEndEmbed], components: []})
      
    })
  }
}