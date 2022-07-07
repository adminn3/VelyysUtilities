const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'yt-comment',
    aliases: ["ytc"],
    utilisation: '{prefix}yt-comment',

    execute(client, message, args) {
      
      // STILL BUGGED, FIXING SOON...
      /*const msg = args.join("");

      const embed1 = new MessageEmbed()
        .setDescription("Please provide the message!")
        .setColor("RED");

      if(!msg) return message.reply({ embeds: [embed1] })

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setImage(`https://some-random-api.ml/canvas/youtube-comment?avatar=${message.author.displayAvatarURL({format: 'png', size:1024})}&username=${message.member.displayName}&comment=${msg}`)
        .setTimestamp()

      message.reply({ embeds: [embed] });*/
      
      message.reply({
        files: [{
          name: 'youtube.png',
          attachment: [
            'https://some-random-api.ml/canvas/youtube-comment?avatar=',
             message.author.displayAvatarURL({format: 'png', size:1024}),
            `&username=${message.member.displayName}`,
            `&comment=${args.join(' ')}`
          ].join('')
        }]
      })
          
    },
};