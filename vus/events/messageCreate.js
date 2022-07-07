const db = require("quick.db");
const colors = require("colors");
const { MessageEmbed } = require('discord.js');
module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.prefix;

    //const ConsoleIDErrorGen = Math.floor(Math.random() * 9999) + 1;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  if(!cmd) return;
  //----------------------------------| Error Catching |----------------------------------
try {
  if (cmd) cmd.execute(client, message, args);
  //console.log(`>${cmd.name} was ran by ${message.author.tag}.`)
} catch(e) {
  //------------------| Error ID & Console Logging |------------------
  
  function makeid(length) {
    var result           = '';
    var characters       = '123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
  }
  const errorID = makeid(12);

  


  // ------------------| End of this line |----------------
  const embedErr = new MessageEmbed()
  .setTitle("Discord API Error")
    .setDescription(`**An error has occured.** Please contact the developers with the ID \`${errorID}\` to check the console and fix the Errors.\n**Discord API Error Name** \`${e}\``)
  .setColor("#ff4242")
  
  message.reply({ embeds: [embedErr], ephemeral: true });
  
  console.log(`\n[ERR] ID ${errorID} :: `.bold.red + e);
  console.log(`\n[Beta] The error is believed to be on the command: ${cmd.name}`)
}

//if(!cmd) return;

}
  
  
//}