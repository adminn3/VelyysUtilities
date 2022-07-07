const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'secret-number',
    aliases: ["secretn", "sn"],
    utilisation: '{prefix}secret-number',

    execute(client, message, args) {

      let buttonAll = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("1")
              .setCustomId("1"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("2")
              .setCustomId("2"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("3")
              .setCustomId("3")
          )

      let button1 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SUCCESS")
              .setLabel("1")
              .setDisabled(true)
              .setCustomId("1"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("2")
              .setDisabled(true)
              .setCustomId("2"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("3")
              .setDisabled(true)
              .setCustomId("3")
          )

      let button2 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("1")
              .setDisabled(true)
              .setCustomId("1"),
            new MessageButton()
              .setStyle("SUCCESS")
              .setLabel("2")
              .setDisabled(true)
              .setCustomId("2"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("3")
              .setDisabled(true)
              .setCustomId("3")
          )

      let button3 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("1")
              .setDisabled(true)
              .setCustomId("1"),
            new MessageButton()
              .setStyle("SECONDARY")
              .setLabel("2")
              .setDisabled(true)
              .setCustomId("2"),
            new MessageButton()
              .setStyle("SUCCESS")
              .setLabel("3")
              .setDisabled(true)
              .setCustomId("3")
          )

      let buttonAllDisabled = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle("DANGER")
              .setLabel("1")
              .setDisabled(true)
              .setCustomId("1"),
            new MessageButton()
              .setStyle("DANGER")
              .setLabel("2")
              .setDisabled(true)
              .setCustomId("2"),
            new MessageButton()
              .setStyle("DANGER")
              .setLabel("3")
              .setDisabled(true)
              .setCustomId("3")
          )

      const Gen = Math.floor((Math.random() * 3) + 1);
      
      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle("Find the Secret Number.")
        .setDescription("Click one of the buttons below to guess the hidden number!")
        .setColor("GREEN");

      const embedFalse = new MessageEmbed()
        .setDescription(`**Fail!** You didn't got the number. The number is: __\`${Gen}\`__`)
        .setColor("RED");

      const embedTrue = new MessageEmbed()
        .setDescription("**Success!** You've got the number!")
        .setColor("GREEN");

      message.reply({ embeds:[embed], components:[buttonAll]}).then(async Message => {
                    
        const filter = i =>  i.user.id === message.author.id
        
        let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
            
        col.on('collect', async(button) => {
          if(button.user.id !== message.author.id) return;
                    
            switch (button.customId) {
                
              case '1':
                
                if(Gen === 1){
                  
                  button.reply({ embeds: [embedTrue], ephemeral: true }).catch(e => { console.log(e)});
                  
                  Message.edit({ components:[button1]}).catch(e => { console.log(e)});
                  
                } else {
                  
                  button.reply({ embeds: [embedFalse], ephemeral: true }).catch(e => { console.log(e)});

                  Message.edit({ components:[buttonAllDisabled]}).catch(e => { console.log(e)});
                  
                } 
                
                break
                
              case '2':
                
                if(Gen === 2){
                  
                  button.reply({ embeds: [embedTrue], ephemeral: true }).catch(e => { console.log(e)});
                  
                  Message.edit({ components:[button2]}).catch(e => { console.log(e)});
                  
                } else {
                  
                  button.reply({ embeds: [embedFalse], ephemeral: true }).catch(e => { console.log(e)});

                  Message.edit({ components:[buttonAllDisabled]}).catch(e => { console.log(e)});
                  
                } 
                
                break

              case '3':
                
                if(Gen === 3){
                  
                  button.reply({ embeds: [embedTrue], ephemeral: true }).catch(e => { console.log(e)});
                  
                  Message.edit({ components:[button3]}).catch(e => { console.log(e)});
                  
                } else {
                  
                  button.reply({ embeds: [embedFalse], ephemeral: true }).catch(e => { console.log(e)});

                  Message.edit({ components:[buttonAllDisabled]}).catch(e => { console.log(e)});
                  
                } 
                
                break
            
            }
        })
    }).catch(e => { });
          
    },
};