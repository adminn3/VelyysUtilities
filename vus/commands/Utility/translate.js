const translate = require('@iamtraction/google-translate')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'translate',
  aliases: 'trans',

  async execute(client, message, args) {

    const query = args.join(" ")

    if(!query) return message.reply("Please provide a text to translate.")

    const translated = await translate(query, { to: 'en' })

    const translatedEmbed = new MessageEmbed()
      .addField("Raw", "```" + query + "```")
      .addField("Translated", "```" + translated.text + "```")
    .setFooter(`Translated by ${message.author.username}`)
    .setTimestamp();

    message.reply({ embeds: [translatedEmbed] })
    
    
  }
}