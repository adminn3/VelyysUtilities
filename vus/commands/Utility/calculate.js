const { MessageEmbed } = require('discord.js');
const math = require("mathjs");

module.exports = {
    name: 'calculate',
    aliases: ["math", "calc"],
    utilisation: '{prefix}',

    execute(client, message, args) {

      const embed1 = new MessageEmbed()
        .setDescription("Please provide a math calculation.")
        .setColor("RED");

      const embed2 = new MessageEmbed()
        .setDescription("Can't calculate this.")
        .setColor("RED");

      if (!args[0]) return message.reply({ embeds: [embed1] });

      let resp;

      try {
        resp = math.evaluate(args.join(" "))
      } catch (e) {
        return message.reply({ embeds: [embed2] });
      }

      const embedLoading = new MessageEmbed()
        .setDescription(`Getting answer of \`${args}\`... (*This might take a while*)`)
        .setColor("YELLOW");

      message.reply({ embeds: [embedLoading] }).then((msg => {

        const embedResult = new MessageEmbed()
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
          .setTitle("Calculator Results:")
          .addFields(
            { name: "Arguments:", value: `\`${args.join(" ")}\``, inline: true },
            { name: "Result:", value: `\`${resp}\``, inline: true },
          )
          .setThumbnail("https://media.discordapp.net/attachments/955749410439053352/956315808164880394/Windows-10-Calculator-Fluent-Icon-Big-256.png")
          .setColor("GREEN")
          .setTimestamp();

        msg.edit({ embeds: [embedResult] })
        
      }))
          
    },
};