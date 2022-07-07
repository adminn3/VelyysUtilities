const discord = require("discord.js");
const ms = require('ms')
const URL = 'https://discord.gg/fezSE6HQTw';
const { Message, Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');

//I have no fucking idea why this exists.

module.exports = {
  name: "mail",
  async execute(client, message, args) {
    const user = message.member;
    var mail = new discord.MessageEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`This mail menu is **NOT** for Somewhere else. Please open a ticket in ${message.guild.name} If needed\n This is the modmail system for ${message.guild.name} to get you support and learning about the support. ex: \`report user\``)
    .setDescription(`*(This can't take modmail tickets please dm modmail or open a ticket in the server.)*\n**Post Art**\n This is for sending your art to the art or photography channel.\n **Warning:**\n If we detect the art is stolen you will be punished.\n **Report User**\n This is for reporting users who have broken rules, it could be DM advertising or some NSFW images they sent to you.\n**Report Staff**\n This is for reporting staff who have done something wrong, it could be something very rude they said to you or maybe even something abusive you observed. This is not used for appealing punishments. **(Only Management can handle appeals so be patient).**\n **Suggestion**\n This is for making suggestion about the server, it could be a rule youd like changed or explained or a cool feature youd like to see, just make sure it is something that is reasonable and serious.  *(We dont have alot of time for jokes)* This is NOT for YouTube or video suggestions.\n **Request Role** \n This is for requesting an obtainable role, please make sure you have checked the role information to see if you qualify or if the role is even obtainable.\n **Appeal**\n This is for appealing any punishment you were given. You can appeal punishments if you did not really break the rule, feel it was unfair or bias. \n**Other**\n This is for sending through any other request you may have such as questions or help needed.`)
    .setColor('#ffad00')
    .setFooter({ text: `You can click the buttons provided for advanced info about a topic. (Not all topics are listed due to discords max button amount.)` })


    var art = new discord.MessageEmbed()
    .setAuthor({ name: "Mail | Art Posting", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Art Posting`)
    .setDescription(`You can Post Art via The Server's [Art Channel](https://discord.com/channels/890632750388887622/893931074089005106).\n For rules & guidelines please click the "Warning" button on the main mail message.`)

    var warning = new discord.MessageEmbed()
    .setAuthor({ name: "Mail | Warning", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Warning`)
    .setDescription(`If you are caught stealing art from an image in the server or from the web, this can end in a warning. *(So on this can result in a server ban.)*`)

    var reportuser = new discord.MessageEmbed()
    .setAuthor({ name: "Mail | Report User", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Report User`)
    .setDescription(`Reporting a user is where the user will be held accountable for something that they sent to you or something through the servers channels. *(e.g: nsfw, 18+ Content etc.)*`)

    var reportstaff = new discord.MessageEmbed()
    .setAuthor({ name: "Mail | Report Staff", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Report Staff`)
    .setDescription(`Reporting Staff is where a staff member of ${message.guild.name} will be held accountable for something that is against staff rules. *(e.g: something that a staff member said to you, or something that you observed.)*`)



    await message.react("✉")
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setStyle("LINK")
      .setLabel("Server Invite")
      .setURL(URL),

      new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Post Art")
      .setCustomId("art"),

      new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Warning")
      .setCustomId("warning"),

      new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Report User")
      .setCustomId("reportuser"),

      new MessageButton()
      .setStyle("SECONDARY")
      .setLabel('Report Staff')
      .setCustomId("reportstaff")
    )
    const mailPage = await message.author.send({ embeds: [mail], components: [row] })
  
  
    const col = await mailPage.createMessageComponentCollector({
      componentType: "BUTTON",
      time: ms ('20m'),
    })

    col.on('collect', i => {
      if(i.URL === URL) {
        console.log(`${user.tag} has clicked Button ID: #${i.URL}.`)
      } else {
      if(i.customId === 'art') {
        user.user.send({ embeds: [art] })
      } else {
      if(i.customId === 'warning') {
        user.user.send({ embeds: [warning] })
      } else {
      if(i.customId === 'reportuser') {
        user.user.send({ embeds: [reportuser] })
      } else {
      if(i.customId === 'reportstaff') {
        user.user.send({ embeds: [reportstaff] })
      } else {}

      }
      } 

      }
      };
      })
    },
      
       

    };