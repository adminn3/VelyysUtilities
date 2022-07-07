const ms = require('ms');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  aliases: 'b',

  async execute(client, message, args, Discord) {
    if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('lol no')

  if(!args[0]) return message.reply(`Please state the member.`)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;

    if(!member) return message.reply(`The user stated is not valid in the guild members registration, try to mention the user.`)
    
    /*let error = new MessageEmbed()
      .setColor("RED")
    .setAuthor(`Error!`, client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`[Error Code: Invalid Permissions:]\`\n\n <:ArrowRight:925222391062347827> *You cant ban a member that has the same level or higher then you.*`)
    
    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [error] })*/

    if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply("You cant ban a member that has the same level or higher then you.")
    

     if(message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("I can't ban a member that is the level of me.")

    const row = new MessageActionRow()
      
      .addComponents(

    new MessageButton()
      .setStyle('SUCCESS')
      .setCustomId('banyes')
      .setLabel('Yes'),

      new MessageButton()
      .setStyle('DANGER')
      .setCustomId('banno')
      .setLabel('No'),
      
      
    )

    
    
    let KickaskEmbed = new MessageEmbed()
    .setColor("ffc268")
    .setTitle("Do you want to proceed?")
    .setDescription(`<:rightDoubleArrow:917174788701687822> **Target:**\n<:space:914705915448528937>${member}`)
    .setFooter({ text: 'Click on either "Yes" or "No" to confirm! you have 10 seconds.' })

    let kickEndEmbed = new MessageEmbed()
    .setDescription("Note this command is still under development.")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = 'No reason.';

    let kickedembed = new MessageEmbed()
    .setColor("ff4242")
    .setDescription(`${member} has been **banned** **|** \`${member.id}\``)

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
    message.reply({ content: `These buttons aren't for you.`, ephemeral: true })

    if (i.customId === 'banyes') {
      member.ban({
        reason: reason
      });


      const banneduser = new MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
    .setColor('ff4242')
    .setTitle(`You've been banned from ${message.guild.name}`)
    .setDescription('You can appeal this ban by clicking [here](https://docs.google.com/forms/d/1RowoiAPXnyk9wv5wLuqpUTFTIIp7SPDpo-QOt0gb4TQ/edit?no_redirect=true&skip_itp2_check=true).')
    .addField('Reason', `${reason}`)
    .setFooter(``)
    .setTimestamp();

    try {
        member.send({ embeds: [banneduser] });
    } catch(err) {
        console.warn("[Ban Error]:", err);

    }
      

      kickPage.edit({ embeds: [kickedembed], components: [] })
    } 

      else if(i.customId === 'banno') {
     
      kickPage.edit({ embeds: [cancelled], components: [] })
      
    } 
      
      
    })

    col.on('end', () => {

      kickPage.edit({ embeds: [kickEndEmbed], components: []})
      
    });
  },
};