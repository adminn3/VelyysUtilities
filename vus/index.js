const Discord = require('discord.js');
const autoModWarning = '[Automod] Exceeding 3 Warnings';
const config = require('./config.json')
const { Intents, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require("discord.js");
const client = new Discord.Client({
  /*ws: {
    properties: {
      $browser: "Discord iOS",
    },
  },*/
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,

  allowedMentions: {
      parse: ["roles", "users"],
      repliedUser: false, //Mention person?: message.reply(bla bla bla.)
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_TYPING, 
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
});
const mongodb = require("mongodb")
const unmutedHex = '10b981';
const mongoose = require("mongoose");
const Fs = require('fs');
const ms = require('ms');
const { readdirSync } = require("fs");
const colors = require("colors");
const wait = require('node:timers/promises').setTimeout;
const { prefix } = require("./config.json");
const fetch = require("node-fetch");
const db = require("quick.db");
const warndb = require('./models/automodschema')
const messagedb = require('./models/messagedb')

const statusArray = ['With my dog, PLAYING', 'General Chat, WATCHING', 'The Mods In The Closet, WATCHING', 'For the rule breakers, WATCHING', 'For staff apps, WATCHING', 'COVID-19, WATCHING', 'Everything go wrong, WATCHING', 'everyone, WATCHING', 'discord.gg/velyy, WATCHING', 'smoothjazz, LISTENING', 'Sniper Develop Me, WATCHING', 'Synical Mod, WATCHING', 'Bernard do the staff stuff, WATCHING', '🎵 ・ Aux, LISTENING', 'pushin 🅿️, PLAYING', ]

    setInterval(() => {
        const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
        const status = random[0]
        const mode = random[1]
        client.user.setActivity(status, { type: mode })
       

    }, 20000)   

// •=======================================| Mongo DB Connection |=======================================• \\

const mongoUrl = config.mongo;

if (!mongoUrl) {
  console.log("[Error] No Mongo URL added to in Secrets. There is one way to fix this Error: \n\n[>] Use the key \"MONGO\" and paste your mongo url in the value case.")
  process.exit();
}

mongoose.connect(mongoUrl).then(() => console.log('[Mongo] [✅] Successfully Connected to MongoDB.')).catch((err) => console.log("[Error] The Mongo is probably invalid in Secrets! Please recheck your Mongo URL."))

 // •=======================================| Testing Codes |=======================================• \\

 // No testing codes available now.

 // •=======================================| Welcome System |=======================================• \\

 client.on('guildMemberAdd', async (user) => {
  const embedWelcome = new MessageEmbed()
    .setAuthor({ name: `Welcome to Juhwade's Community`, iconURL: client.user.displayAvatarURL() })
    .setDescription(`>>> **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**\nWelcome To our server. We are a chill and Strictly SFW community server. We offer frequent giveaways and events which may include nitro prizes. Make sure to read the <#895052981265924146> and grab some <#926295904053514260> to get Started!\nIf you have any questions, or concerns please dm <@945855533213188137> and a moderator will be there to assist you.\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    .addFields(
      { name: 'Ban Appeal Form', value: "> https://docs.google.com/forms/d/1RowoiAPXnyk9wv5wLuqpUTFTIIp7SPDpo-QOt0gb4TQ/viewform?" },
      { name: 'Permanent Invite Link', value: '> https://discord.gg/fezSE6HQTw' },
    )
    .setColor("#0062ff")
    .setFooter({ text: `Welcome to the server and enjoy your stay.` })


  user.send({ embeds: [embedWelcome] })
})

// •=======================================| Auto Moderation |=======================================• \\

 const { emoji } = require("./config/automod/emoji.json");

 client.on("guildMemberAdd", async (member) => {
  let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
  UserJSON[member.username] = {
    warns: 0
  }
  Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
 })

 let badWords = require("./config/automod/swears.json");
 client.on("messageCreate", async message => {
  let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

  if (!UserJSON[message.author.username]) {
    if (message.author.bot) return;
    UserJSON[message.author.username] = {
      warns: 0
    }
    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
  }
  //const whitelisted = ["501045011518062592"]
  
 for (i = 0; i < badWords.length; i++) {
 if (message.content.toLowerCase().includes(badWords[i])) {
  if(message.member.permissions.has("ADMINISTRATOR")) {
    return;
  } else {
    if(message.author.bot) return;
    message.channel.send({ content: `${message.author}, ${emoji} you are not allowed to send prohibited words in this channel. Continuing will result in a mute.` })
    const reason = `[Automod] Sending prohibited words.`;
    warndb.findOne({
      guild: message.guild.id,
      user: message.author.id
    }, async(err, data) => {
      if(err) throw err;
      if(!data) {
        data = new warndb({
          guild: message.guild.id,
          user: message.author.id,
          content: [{
            moderator: client.user.id,
            reason: reason
          }]
        })
      } else {
        const obj = {
          moderator: client.user.id,
          reason: reason
        }
        data.content.push(obj)
      }
      data.save()
    })
  }
//--------------------------------------------------------------------------------------------------------
  
var warnEm = new MessageEmbed()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor('#ffc268')
            .setTitle(`You've been warned in ${message.guild.name}`)
            .setDescription('')
            .addField('Reason' , '[Automod] Sending prohibited words.')
            .addField('Expires' , '1 day')
            .setFooter({ text: `` })
            .setTimestamp();
 
            try {
                message.author.send({ embeds: [warnEm] })
 
            } catch(err) {
            console.log('[Automod - Warn]', err)
            }
 
            

message.delete().catch(err => console.log(err));

UserJSON[message.author.username].warns += 1;
Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

    try {
if (UserJSON[message.author.username].warns === 3) {
  
  
 // start from here \\
(Fs.readFileSync("./database/users.json"));
  
  UserJSON[message.author.username].warns = 0;// CHANGE THIS TO '0' LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  
  Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

  const user = message.member


 //--------------ANTI PING SYSTEM--------------
        // ---------------- Coming Soon...----------------
 //-------- | Anti-Link | --------
 /*function isValidUrl (string1) {
  var res = string1.match('~https:?//(?|media\.giphy\.com/media/([^ /]+)\.gif|giphy\.com/gifs/(?:.*-)?([^ /]+))~i');
  return (res !== null)
 };
 var tenorsGif = message.content;
  if(isValidUrl(tenorsGif) && !message.member.permissions.has("MANAGE_MESSAGES")) {
  message.delete();
  return message.channel.send(`${animeBonk} no gifs. [Placeholder]`)
 }*/ // never worked. code from snipoys club.
  // ------- | Automute (timeout function) | -------


  const { timeout } = require("./config/automod/timeout.json")

  const time = timeout;

  const milliseconds = ms(time);

  const iosTime = new Date(Date.now() + milliseconds).toISOString();

  try {
    

	  await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
		  method: 'PATCH',
		  body: JSON.stringify({ communication_disabled_until: iosTime }),
		  headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bot ${client.token}`,
		  },
	  });

  } catch (err) {

    console.log("[Automod - Error] ", err)
    
  }
  
 var mutedEm = new Discord.MessageEmbed()
                .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
                .setColor('#ff4242')
                .setDescription(`**${message.author.username}** has been muted for continuous infractions.`)
                message.channel.send({ embeds: [mutedEm] })

  


                let mansGotMutedL = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor('#ffc268')
                .setTitle(`You've been muted in ${message.guild.name}`)
                .setDescription('')
                .addField('Reason' , `${autoModWarning}`)
                .addField('Additional Information' , 'You have 2 more warnings before you get banned.')
                .addField('Expires' , '6 hours')
                .setTimestamp();
 
                try {
                    
                    message.author.send({ embeds: [mansGotMutedL] })
 
                } catch(err) {
 console.log('Error:', + err)
                }
 }
    } catch (err) {
      
      console.log(err)
      
    }
        }
    }
})

/*setTimeout(function () {
                    const unmute = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.username}` , client.user.displayAvatarURL({dynamic: true}))
                    .setColor(unmutedHex)
                    .setTitle(`You've been unmuted in ${message.guild.name}`)
                    .addField('Reason' , '[Automod] Mute Cleared')
                    .setFooter(``)
                    .setTimestamp();
                    message.author.send({ embeds: [unmute] })
                }, ms('5s'));
  }
})*/


// •=======================================| Console Logs |=======================================• \\

console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`┃                                                                   ┃`.bold.brightGreen)
    console.log(`┃        PapiChulo is online!                                       ┃`.bold.brightGreen)
    console.log(`┃    /-/ Velyy\'s Utilities#0543 /-/                                 ┃`.bold.brightGreen)
    console.log(`┃    /-/ Made With ❤️  By SniperCatJr#7373 /-/                       ┃`.bold.brightGreen)
    console.log(`┃                                                                   ┃`.bold.brightGreen)
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
// •=======================================| Events and Commands Handler |=======================================• \\

client.config = require('./config.json')
client.commands = new Discord.Collection()
//require('./events/commands')(client);

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`[Handler - Events] Loading the events...`.bold.yellow);
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`[Handler - Events] Status: ✅ • Loaded event: ${file.split('.')[0]}`.bold.brightGreen);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};

console.log(`\n[Handler - Cmds] Loading the commands...`.bold.yellow);

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`[Handler - Cmds] Status: ✅ • Loaded command: ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command); // set the commands. - Sniper 1:10 AM 5/31/22
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});



// •=======================================| Snipe and other Commands/More Automod: |=======================================• \\

 /*client.snipes = new Map()

 client.on('messageDelete', function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.id,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
 })*/

 client.on('messageCreate', async (message) => {
  const dam = '<:V_shrug:910352518670843955>';
  if (message.channel.id === "994052055314485390") {
    if(message.author.bot) return;
    message.reply('Aha IP Stolen.')
    message.react(dam);
}
if(message.content.length >= 650) {
  let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

  if (!UserJSON[message.author.username]) {
    if (message.author.bot) return;
    UserJSON[message.author.username] = {
      warns: 0
    }
    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
  }
  if(message.member.permissions.has("ADMINISTRATOR")) {
    return;
  } else {
    const reason = `[Automod] Sending text blocks or large messages.`;
    messagedb.findOne({
      guild: message.guild.id,
      user: message.author.id
    }, async(err, data) => {
      if(err) throw err;
      if(!data) {
        data = new warndb({
          guild: message.guild.id,
          user: message.author.id,
          content: message.content.length,
          content: [{
            moderator: client.user.id,
            reason: reason,
            content: message.content.length
          }]
        })
      } else {
        const obj = {
          moderator: client.user.id,
          reason: reason,
          content: message.content.length
        }
        data.content.push(obj)
      }
      data.save()
    })
    //--------------------------------------------------------------------------------------------------------
  
var warnEm = new MessageEmbed()
.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
.setColor('#ffc268')
.setTitle(`You've been warned in ${message.guild.name}`)
.setDescription('')
.addField('Reason' , '[Automod] Sending text blocks or large messages.')
.addField('Expires' , '1 day')
.setFooter({ text: `` })
.setTimestamp();

try {
    message.author.send({ embeds: [warnEm] })

} catch(err) {
console.log('[Automod - Warn]', err)
}



message.delete().catch(err => console.log(err));

UserJSON[message.author.username].warns += 1;
Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
try {
  if (UserJSON[message.author.username].warns === 3) {
    
    
   // start from here \\
  (Fs.readFileSync("./database/users.json"));
    
    UserJSON[message.author.username].warns = 0;// CHANGE THIS TO '0' LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
    
    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
  
    const user = message.member
  
    const { timeout } = require("./config/automod/timeout.json")
  
    const time = timeout;
  
    const milliseconds = ms(time);
  
    const iosTime = new Date(Date.now() + milliseconds).toISOString();
  
    try {
      
  
      await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ communication_disabled_until: iosTime }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bot ${client.token}`,
        },
      });
  
    } catch (err) {
  
      console.log("[Automod - Error] ", err)
      
    }
    
   var mutedEm = new Discord.MessageEmbed()
                  .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
                  .setColor('#ff4242')
                  .setDescription(`**${message.author.username}** has been muted for continuous infractions.`)
                  message.channel.send({ embeds: [mutedEm] })
  
    
  
  
                  let mansGotMutedL = new MessageEmbed()
                  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                  .setColor('#ffc268')
                  .setTitle(`You've been muted in ${message.guild.name}`)
                  .setDescription('')
                  .addField('Reason' , `${autoModWarning}`)
                  .addField('Additional Information' , 'You have 2 more warnings before you get banned.')
                  .addField('Expires' , '6 hours')
                  .setTimestamp();
   
                  try {
                      
                      message.author.send({ embeds: [mansGotMutedL] })
   
                  } catch(err) {
   console.log('Error:', + err)
                  }
   }
      } catch (err) {
        
        console.log(err)
        
      }
  message.delete()
  return message.channel.send(`${message.author}, ${emoji} sending text blocks or large messages is prohibited. Continuing will result in a mute.`)
  }
}
  if(message.content === 'nah') {
    message.channel.send({ content: `Nah.` })
  }

  if(message.content === "gay") {
    message.channel.send({ content: `no you.` })
  }

  if(message.content === `${prefix}snipe`) {
    if(!message.member.permissions.has("KICK_MEMBERS")) {
      return;
    }
/*setInterval(() => {
    const channel = client.channels.cache.get('channel_id')
    const messageArray = [`This bot was made by cats Thank them!`, `If you would like Mod click [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`, `Beep boop. Robot here. Definitely not planning to take over the world.`, `View all the info you need on roles by clicking [here](https://discord.com/channels/890632750388887622/8950544895208448700).`, `We need slowmode in order to moderate chat properly, so please don't complain about it.`, `View all the info on bots by clicking [here](https://discord.com/channels/890632750388887622/954122395025809448).`, `Annoyed because I constantly repeat information you already know every 15 minutes? Too bad!`]
    const random = messageArray[Math.floor(Math.random() * messageArray.length)]
    const joe = new Discord.MessageEmbed()
    .setColor('#ffc268')
    .setDescription(`:infosymbol: ${random}`)
    .setFooter('')
    channel.send(joe)
}, 1000000)*/
    
    /*const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.reply({ content: `**No latest Deleted Message was Found.**` })

    const embed = new MessageEmbed()
      .setTitle("Sniped")
      .setDescription(`**Channel:** <#${message.channel.id}>\n\n**User:** <@${msg.author}>\n\n**Message:** ${msg.content}`)
      .setColor("ff4242")
      .setFooter({ text: "Notice: Snipe command Doesn't break Discord ToS." })
      .setTimestamp();

    if(msg.image) embed.setImage(msg.image)
    message.reply({ content: ` **Last Deleted Message:**`, embeds: [embed] })
  }
})*/
  }
})
// •=======================================| Login to Bot |=======================================• \\

client.login(config.token).catch(() => console.log("\n[Error] Bot Token Invalid or Missing Intents! Please recheck your bot token or enable all the Intents.".bold.red));

const token = config.token;

if(!token) {
  console.log("\n[Error] No Bot Token provided in Config. Please fix this error on your application page on Discord Developer's Website.".bold.red), process.exit();
}
