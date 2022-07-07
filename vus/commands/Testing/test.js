const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const start = Date.now();

module.exports = {
    name: 'test',
    aliases: [],
    utilisation: '{prefix}test',

    execute(client, message, args) {

      let button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("API Latency")//API Latency
              .setCustomId("api"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("Message Latency(WIP)")//Message Latency (WIP)
              .setCustomId("msglncy")
              .setDisabled(true),

        
              

          )

      const embed = new MessageEmbed()
        .setDescription("Ping Command With Buttons.");

      message.channel.send({embeds:[embed], components:[button]}).then(async Message => {
                    
        const filter = (i) =>  i.user.id === message.author.id
        
        let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
            
        col.on('collect', async(button) => {
          if(button.user.id !== message.author.id) return
                    
            switch (button.customId) {
              case 'api':
                button.reply({content: `${Math.round(client.ws.ping)}ms`, ephemeral: true}).catch(e => { console.log(e) });           
                break
              case 'msglncy':
                button.reply({content: `${message.createdTimestamp - start}ms`, ephemeral: true}).catch(e => { console.log(e) });
                break


            
            
            }
        })
    }).catch(e => { });
          
    },
};