/*const colors = require('colors')

module.exports = {
	name: 'restart',
	async execute(client, message, args) {
		if (message.author.id !== '501045011518062592') {
			return message.delete();
		}
		await message.channel.send('Restarting....');
		console.log(`${client.user.username} has been shutdown. - Console`.bold.red)
		return process.exit();
	},
};*/






const colors = require('colors')
const ms = require('ms');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shutdown',
  //aliases: '',

  async execute(client, message, args, Discord) {
    if(message.author.id !== '501045011518062592') {
		return;
	} else {
    /*let error = new MessageEmbed()
      .setColor("RED")
    .setAuthor(`Error!`, client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`[Error Code: Invalid Permissions:]\`\n\n <:ArrowRight:925222391062347827> *You cant ban a member that has the same level or higher then you.*`)
    
    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [error] })*/
    const row = new MessageActionRow()
      
      .addComponents(

    new MessageButton()
      .setStyle('SUCCESS')
      .setCustomId('restartyes')
      .setLabel('Yes'),

      new MessageButton()
      .setStyle('DANGER')
      .setCustomId('restartno')
      .setLabel('No'),
      
      
    )

    
    
    let restartaskEmbed = new MessageEmbed()
    .setColor("ffc268")
    .setTitle("Do you want to proceed?")
    .setDescription(`<:rightDoubleArrow:917174788701687822> **Shutdown Client**\n<:space:914705915448528937>\`${client.user.username}\``)
    .setFooter({ text: 'Click on either "Yes" or "No" to confirm. you have 10 seconds. (PS: It wont give a respond as it shutdowns before a button could respond to your actions. (Ignoring "no") )'})

    let restartEndEmbed = new MessageEmbed()
    .setDescription("Note this command is still under development.")

    let restartedembed = new MessageEmbed()
    .setColor("ff4242")
    .setDescription(`Restarting....`)

    let cancelled = new MessageEmbed()
    .setColor("ff4242")
    .setDescription(`Action Cancelled.`)
    
    

    const restart = await message.reply({ embeds: [restartaskEmbed], components: [row] })

    const col = await restart.createMessageComponentCollector({
      componentType: "BUTTON",
      time: ms ('10s'),
    })

    col.on('collect', i => {

    /*if (i.user.id !== message.author.id) return
    message.reply({ content: `These buttons aren't for you.`, ephemeral: true })*/

    if (i.customId === 'restartyes') {
	 try {
    message.channel.send('Restarting....')
	 console.log(`${client.user.username} has been shutdown. - Console`.bold.red)
     return client.destroy()
   } catch (e) {
     return console.log(`[Restart - Error] - ${e}`.bold.red)
   }
    } 

      else if(i.customId === 'restartno') {
     
      restart.edit({ embeds: [cancelled], components: [] })
      
    } 
      
      
    })

    col.on('end', () => {

      restart.edit({ embeds: [restartEndEmbed], components: []})
      
    });
};
  },
};