const { MessageEmbed } = require('discord.js');
const child = require('child_process');

module.exports = {
  name: 'exec',
  aliases: 'execute',

  execute(client, message, args) {
    if (message.author.id !== ["501045011518062592", "565956573164339210"]) { // <-- Synical & Sniper
      return;
    }
      const cmd = args.join(" ");
      if(!cmd) return message.reply("Please provide code for me to execute.")

      child.exec(cmd, (err, res) => {
        if(err) return console.log(err)
        message.channel.send("```" + res.slice(0, 2000) + "```", { code: "js" });
      })
  }
}