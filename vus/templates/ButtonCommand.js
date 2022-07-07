// This will not work if you use this command, You need to change this file place to one of the folders in the folder "commands" to make this a real working command.
// For more info about the buttons, visit: https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'test',
    aliases: [],
    utilisation: '{prefix}test',

    execute(client, message, args) {

      let button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel(".38 Rifle")
              .setCustomId("rel"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel(".357 Magnum")
              .setCustomId("del")
          )

      const embed = new MessageEmbed()
        .setDescription("Gun Buttons.");

      message.channel.send({embeds:[embed], components:[button]}).then(async Message => {
                    
        const filter = i =>  i.user.id === message.author.id
        
        let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
            
        col.on('collect', async(button) => {
          if(button.user.id !== message.author.id) return
                    
            switch (button.customId) {
              case 'rel':
                button.reply({content: `38 then.`, ephemeral: true}).catch(e => { });           
                break
              case 'del':
                button.reply({content: `357 then.`, ephemeral: true}).catch(e => { });
                break
            
            }
        })
    }).catch(e => { });
          
    },
};