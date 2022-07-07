const Discord = require('discord.js');
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const ms = require('ms');


module.exports = {
  name: 'testbuts',
  description: 'Test command',
  async execute (client, message, args) {
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setLabel('Click me!')
    .setStyle("LINK")
    .setEmoji("🚀")
    .setURL("https://twitch.tv/iflygamer1"),

    new MessageButton()
    .setLabel('Click to disable this button!')
    .setStyle("DANGER")
    .setEmoji("❌")
    .setCustomId('1')

  )
  const dam = new MessageEmbed()
  .setColor("BLURPLE")
  .setDescription("C'mon I know you wanna click these magical things.")
    let msg = await message.channel.send({ embeds: [dam], components: [row] })
    const col = await msg.createMessageComponentCollector({
        componentType: "BUTTON",
      })

    col.on("collect", i => {
      //console.log(`button${i.id} has been clicked by ${message.author.tag}`) // really annoying and wont even mention the id just sum random ass string.
      i.deferUpdate();

      if(i.customId === '1') {
        const row2 = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Disabled')
          .setEmoji("✅")
          .setStyle("SECONDARY")
          .setDisabled()
          .setCustomId('2')
        )
      msg.edit({
        content: `All buttons have been disabled.`,
        components: [row2]
    })
      }
    })
  }
}