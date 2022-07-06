const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const beautify = require('beautify');
const hrstart = process.hrtime();
//const { owners } = require("../../config.json")

module.exports = {
  name: 'eval',
  //aliases: 'exec',


  execute(client, message, args) { 

        if (message.author.id !== '501045011518062592') {
            return message.delete()
        }
        
        if (!args[0]) {
            return;
        }

        try{
            if (args.join(" ").toLowerCase().includes("token")) {
                return message.reply("Giving Out You're token could be used in many bad ways. try to avoid using this. instead use Discord Developer Portal and get my token.")
            }
        
            const toEval = args.join(" ");
            const evaluated = eval(toEval);
            if(evaluated > 1024) {
                return message.reply('You can not execute JS that is over 1024 characters.');
            }

            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
            .setColor("GREEN")
            .setDescription(`*Evaluated in: ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms*`)
            .setTitle("Evaluation")
            .addField("📥 Input", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
            .addField("📤 Output", `\`\`\`${evaluated > 1024 ? 'Code Is too long to display.' : evaluated}\`\`\``)
            .addField("Type", `\`\`\`${typeof(evaluated)}\`\`\``);

            message.channel.send({ embeds: [embed] });

        } catch (e) {
          const err = new Discord.MessageEmbed()
          .setAuthor({ name: 'Error!', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setColor("#f70505")
          .setDescription(`*Evaluation Error Occured in: ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms*`)
          .setTitle('Failed Evaluation')
          .addField("📥 Input", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
          .addField("📤 Output", `\`\`\`${e}\`\`\``)
          .setFooter({ text: `Returned Error Type: ${e.name}`})

          message.channel.send({ embeds: [err] })
        }

    },

};
