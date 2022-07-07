//const { moderatorRoleId } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nick',
    aliases: ["setnick", "n", "mod"],
    utilisation: '{prefix}nick',

    execute(client, message, args) {
      if(!message.member.permissions.has('MANAGE_MESSAGES')) {
        return;
      }

    /*const ModeratorRole = message.guild.roles.cache.find(role => role.id === `${moderatorRoleId}`);

    if (!ModeratorRole)
    return console.log("[WARN] The Moderator role does not exist!");

    if (!message.member.roles.cache.has(ModeratorRole.id)) {

      message.delete()
      
    } else {*/

      const embed1 = new MessageEmbed()
        .setDescription("Please mention a user, or that user is probably invalid.")

      
        if (!args[0]) return message.reply({ embeds: [embed1] });
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
      
        if (!member) return message.reply({ embeds: [embed1] });

        /*const embedErr = new MessageEmbed()
          .setDescription("That user is having the same power as yours.")
          .setColor("RED");

        if(member.roles.cache.has(ModeratorRole.id)) return message.reply({ embeds: [embedErr] });*/

        if (args[1]) {

        let nick = args.slice(1).join(' ');
          
        member.setNickname(nick).catch((err) => message.reply(`**Error!** ${err}`))
          
        message.channel.send(`Nickname set \`${nick}\`.`)
        
        } else {

        function makeid(length) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
             charactersLength));
          }
         return result;
        }

        const newNick = makeid(10);
          
        member.setNickname(`Moderated Nickname ${newNick}`).catch(err => console.log(err))

        const embed = new MessageEmbed()
          .setDescription(`Moderated Name to \`${newNick}\`.`)
          .setColor("ffc268")
      
        message.channel.send({ embeds: [embed]})
          
        }

    
          
    },
};