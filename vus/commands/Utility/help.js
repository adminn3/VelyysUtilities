const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { Info } = require('../../emojis.json')
const fs = require('fs')

module.exports = {
  name: 'help',
  aliases: 'h',
  description: 'Shows all commands of the bot.',
  category: 'Utility',
  example: '>h <command name>',
  async execute(client, message, args) {
    if(args[0]) {
        
      const ctg = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(args[0]))
      if(!ctg) return message.reply(`${Info} Command Not Found.`)
 
      let name = ctg.name
      let aliases = ctg.aliases
      if(!aliases) aliases = "No aliases was found."
      let desc = ctg.description
      if(!desc) desc = "No description was found."
      let usages = ctg.usage
      if(!usages) usages = "No usages was found."
      let examples = ctg.example
      if(!examples) examples = "No examples was found."

      
      const ctgEmbed = new MessageEmbed()
      .setAuthor(`Help | ${name}`, client.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`Advanced Command Help`)
      .setDescription(`**<> - Required [] - Optional**`)
      //.setTitle(`Command: ${name} \nAliases: ${aliases} \nDescription: ${desc} \nUsage: ${usages} \nExample: ${examples}`)
      .addFields(
		{ name: 'Command', value: `${name}` },
		{ name: 'Aliases', value: `${aliases}` },
		{ name: 'Description', value: `${desc}` },
		{ name: 'Usage', value: `${usages}` },
        { name: 'Examples', value: `${examples}` },
	);

      message.channel.send({ embeds: [ctgEmbed] })
    } else {
let categories = [];

      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return `\`Command not Registered.\``;

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "\`Coming Soon.\`" : cmds.join(", "),
        };

        categories.push(data);
      });

      const allEmbed = new MessageEmbed()
      .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))
      .setTitle('My prefix is \`' + prefix + '\` \nHere are all my commands:')
      .addFields(categories)
      //.addField("\nNOTE:", 'The bot has been updated and it is recommended for you give the bot \`ADMINISTRATOR\`')
      .setDescription(`**Use ${prefix}help <cmd> for more info about a command.**`)
      .setFooter(`© ${client.user.username} • Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

      message.channel.send({ embeds: [allEmbed] })
      
    }
  }
}







































/*const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require('../../config.json').prefix 
let color = "#ff0000"; // color of the main embed

const create_mh = require(`../../functions/menu`); // creates the drop down menu

module.exports = {
    name: "help",
    aliases: ['commands', 'h'],
    description: "Shows all available bot commands",
    async execute(client, message, args) {

        let categories = [];
        let cots = [];

        if (!args[0]) {

          // if you want your 'test' folder to not show when the help command is ran, use this
          let ignored = [
            'testing',
            'developer'
          ]
            

             const emo = {
              developer: "<:V_VerifiedBotDeveloper:896901113868070912>",
              faq: "❓",
              fun: "<:controller:955516743491653642>",
              image: "🖼️",
              moderation: "<:Ban:955516743609090088>",
              rules: "📜",
              utility: "⚙️"
              }

            let ccate = []
          
            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`
                
                let nome = dir.toUpperCase()

                let cats = new Object()
                
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats)
                ccate.push(nome)
            });
            //embed
            const embed = new MessageEmbed()
                .setTitle(`Bot Commands`)
                .setDescription(`>>> My prefix is \`${prefix}\`\nUse the menu, or use \`${prefix}help [category]\` to view commands base on their category!`)
                .addFields(categories)
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color)


//creating the dropdown menu
            let menus = create_mh(ccate)
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0]

                    let catts = []

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        )


                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`)

                            if (!file.name) return "There is no such command.";

                            let name = file.name.replace(".js", "")

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj
                        })

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No description given.`,
                                inline: true,
                            }
                            catts.push(dota)
                        })

                        cots.push(dir.toLowerCase())
                    })

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.deferUpdate();

                        return interaction.message.edit({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    }

                }

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                }

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                })
                collector.on("collect", select)
                collector.on("end", () => null)

            })

        } else {
            let catts = []

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                )


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`)

                    if (!file.name) return "No command name."

                    let name = file.name.replace(".js", "")

                    if (client.commands.get(name).hidden) return


                    let des = client.commands.get(name).description
                    let emo = client.commands.get(name).emoji
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj
                })

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                })

                cots.push(dir.toLowerCase());
            })

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                )

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.reply({
                    embeds: [combed]
                })
            }

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                    .setColor("RED");
                return await message.reply({
                    embeds: [embed],
                })
            }

            const embed = new MessageEmbed() 
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]
            })
        }
    },
}*/