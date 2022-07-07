const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rule',
    aliases: 'r',
    description: 'Finds a rule from the rules channel.',
    usage: '>rule <ruleNumber>',
    example: '>rule 2',
    async execute(client, message, args) {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) {
            return;
        }
        const rule1 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`1. Follow Discord's ToS. [Terms](https://discordapp.com/terms) - [ToS](https://discordapp.com/guidelines)`)

        const rule2 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`2. Be respectful with all members Be respectful to others , No death threats, sexism, hate speech, racism (NO N WORD, this includes soft N) No doxxing, swatting, witch hunting`)

        const rule3 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`3. No DM Advertising Includes DM Advertising. We do not allow advertising here of any kind.`)

        const rule4 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`4. No NSFW content Anything involving gore or sexual content is not allowed. NSFW = Not Safe for Work`)

        const rule5 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`5. No spamming in text or VC Do not spam messages, soundboards, voice changers, or earrape in any channel.`)

        const rule6 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`6. Do not discuss about sensitive topics This isn't a debating server, keep sensitive topics out of here so we don't have a ton of nasty arguments.`)

        const rule7 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`7. No malicious content No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban.`)

        const rule8 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`8. No Self Bots Includes all kinds of selfbots: Nitro snipers, selfbots like nighty, auto changing statuses *(Also don't confuse the bot <@925231141441650728> as a self-bot as it is not and is the main server's moderation bot.)*`)

        const rule9 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`9. Do not DM the staff team. Please open a ticket instead in: <#907610433614131262>.`)

        const rule10 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`10. Profile Picture / Banner Rules No NSFW allowed, No racism, No brightly flashing pictures to induce an epileptic attack.`)

        const rule11 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`11. Emoji Rules No NSFW allowed, No racism, No brightly flashing pictures to induce an epileptic attack.`)

        const rule12 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`12. Use English only We cannot easily moderate chats in different languages, sorry. English only.`)

        const rule13 = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`13. Maturity all members are expected to display maturity at all times. `)

        const ruleNote = new MessageEmbed()
        .setColor("#ef4444")
        .setDescription(`Note: \n> *Our moderators are a group of people selected by ${message.guild.name}(s) Staff. They have been chosen for their competences, commitment and decision-making capacity. ​​​Our moderators are allowed to warn/mute/kick/ban you for any reason not mentioned above. channel-specific rules apply.*`)

        if(!args.length) return message.reply(`Please put a number.`);

        const ruleNumber = args[0].toLowerCase();
        
        if(!['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'note'].includes(ruleNumber)) return message.reply(`That rule does not exist or you didn't put a number.`);

        if(ruleNumber === '1') {
            message.channel.send({ embeds: [rule1] })
        }

        if(ruleNumber === '2') {
            message.channel.send({ embeds: [rule2] })
        }

        if(ruleNumber === '3') {
            message.channel.send({ embeds: [rule3] })
        }

        if(ruleNumber === '4') {
            message.channel.send({ embeds: [rule4] })
        }

        if(ruleNumber === '5') {
            message.channel.send({ embeds: [rule5] })
        }

        if(ruleNumber === '6') {
            message.channel.send({ embeds: [rule6] })
        } 

        if(ruleNumber === '7') {
            message.channel.send({ embeds: [rule7] })
        }

        if(ruleNumber === '8') {
            message.channel.send({ embeds: [rule8] })
        }

        if(ruleNumber === '9') {
            message.channel.send({ embeds: [rule9] })
        }

        if(ruleNumber === '10') {
            message.channel.send({ embeds: [rule10] })
        }

        if(ruleNumber === '11') {
            message.channel.send({ embeds: [rule11] })
        }

        if(ruleNumber === '12') {
            message.channel.send({ embeds: [rule12] })
        }

        if(ruleNumber === '13') {
            message.channel.send({ embeds: [rule13] })
        }

        if(ruleNumber === 'note') {
            message.channel.send({ embeds: [ruleNote] })
        }
    },
};