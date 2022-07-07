const ms = require('ms')
const { Message, Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
  name: 'kick',
  aliases: 'k',

  async execute(client, message, args, Discord) {
    if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply('lol no')

  if(!args[0]) return message.reply(`Please state the member.`)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;

    if(!member) return message.reply(`The user stated is not valid in the guilds member registration, try to use an ID, Mention, Or use the members display name.`)

    if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply("You cant kick a member that has the same level or higher of you.")

     if(message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("I can't kick a member that is the level of me.")
    const row = new MessageActionRow()
      
      .addComponents(

    new MessageButton()
      .setStyle('SUCCESS')
      .setCustomId('kickyes')
      .setLabel('Yes'),

      new MessageButton()
      .setStyle('DANGER')
      .setCustomId('kickno')
      .setLabel('No'),
      
      
    );

    let KickaskEmbed = new MessageEmbed()
    .setColor("ffc268")
    .setTitle("Do you want to proceed?")
    .setDescription(`<:rightDoubleArrow:917174788701687822>**Target:**\n<:space:914705915448528937>${member}`)
    .setFooter({ text: `Click on either "Yes" or "No" to confirm! you have 10 seconds.` })

    let kickEndEmbed = new MessageEmbed()
    .setDescription("Command expired.")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = 'No reason.';

    let kickedembed = new MessageEmbed()
    .setColor("ffc268")
    .setDescription(`${member} has been **kicked** **|** \`${member.id}\``)

    let cancelled = new MessageEmbed()
    .setColor("ff4242")
    .setDescription(`Action Cancelled.`)

    const kickPage = await message.reply({ embeds: [KickaskEmbed], components: [row] })

    const col = await kickPage.createMessageComponentCollector({
      componentType: "BUTTON",
      time: ms ('10s'),
    })

    col.on('collect', i => {

    if (i.user.id !== message.author.id) return

    if (i.customId === 'kickyes') {
      member.kick({ 
        reason: reason 
      });

        const kickeduser = new MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
    .setColor('ffc268')
    .setTitle(`You've been kicked from ${message.guild.name}`)
    .setDescription('')
    .addField('Reason', `${reason}`)
    .setFooter(``)
    .setTimestamp();

    try {
        member.send({ embeds: [kickeduser] });
    } catch(err) {
        console.log(err);
    }

      kickPage.edit({ embeds: [kickedembed], components: [] })
    } 

      else if(i.customId === 'kickno') {
     
      kickPage.edit({ embeds: [cancelled], components: [] })
      
    } 
      
      
    })

    col.on('end', () => {

      kickPage.edit({ embeds: [kickEndEmbed], components: []})
      
    })
  }
}