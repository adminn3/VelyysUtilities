const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "bean",
    aliases: [],
    category: "Moderation",
    description: "Bean a user, not Ban a user!!!1!1!",
    usage: "bean <user> [reason]",
    async execute(client, message, args) {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

	    const embed0 = new MessageEmbed()
        .setDescription(`Please mention the user.`)
       	.setColor('#ef4444');

	    if(!args[0]) return message.reply({ embeds: [embed0] });

      const user = message.mentions.members.first() || message.guild.members.cache.find(r => r.user.id === args[0]);

      const embed1 = new MessageEmbed()
        .setDescription(`Couldn't find that user on this server.`)
       	.setColor('#ef4444');

      if(!user) return message.reply({ embeds: [embed1] });

      let filter = (i) => i.member.id === user.id;

      const embed = new MessageEmbed()
        .setDescription(`${user} has been **beaned** **|** \`${user.id}\``)
        .setColor('#ff4242');

     	message.channel.send({ embeds: [embed] });

      let msg = await message.channel.awaitMessages({
      	filter: filter,
      	max: 1
      })

     	msg.first().react("🌱");
        
    },
};