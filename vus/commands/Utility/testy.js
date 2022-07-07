const { MessageEmbed, MessageFlags } = require('discord.js')

module.exports = {
  name: 'testlog',
  aliases: 'cl',

  async execute(client, message, args) {
    const e = args.join(" ")

    if(!e) return message.channel.send('Please provide a message to send to my developer.')
await message.channel.send("Message Sent To My Developer.")
    return console.log(e + ` - User Message From ${message.author.tag} (${message.author.id}).`) 
  }
}