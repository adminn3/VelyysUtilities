const discord = require("discord.js");


module.exports = {
  name: "credits",
  async execute(client, message, args) {
    
    let embed = new discord.MessageEmbed()
    .setAuthor(`Thanks Everyone!` , client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`We'd like to thank everyone who has made Velyy\'s Utilities possible. Lots of things have come from Velyy\s like, well, obviously our community, We wouldn't be here without __everyone__ who has supported and continues to support this project. Thank you!`)
    .setDescription('')
    .addField('Development' , '[SniperCatJr#7373](https://twitter.com/VelyysUtilities)')
    .addField('Supporters' , '[Synical](https://linktr.ee/11.25.12.5)')
    .addField('Special Thanks to' , 'The [Velyy\'s Community](https://discord.gg/velyy) staff team.')
    .addField('Copyright' , 'Copyright (C) Velyys Utilities, 2021 - 2022. All rights reserved. The relicensing or reuse of Velyys assets, tradenames and tradenames is not permitted without a usage license. Copyright (C) Icons from [Freepik](https://www.freepik.com/) and [Flaticon](https://www.flaticon.com/).')
    message.channel.send({ embeds: [embed] })
  }
}