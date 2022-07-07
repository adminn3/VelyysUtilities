const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageComponentInteraction } = require('discord.js');
const fetch = require('node-fetch')


module.exports = {
    name: 'meme',
    description: 'Random meme button',
    timeout: 10000,

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        let data = await fetch("https://api.popcatdev.repl.co/meme")
            .then(r => r.json())

        const button1 = new MessageButton()
            .setLabel("Next Meme")
            .setStyle("SUCCESS")
            .setCustomId("memerate")

        const button2 = new MessageButton()
            .setLabel("End Interaction")
            .setStyle("SECONDARY")
            .setCustomId("memeclose")


        const row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)

        const newEmbed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setColor('RANDOM')
            .setImage(data.image)
            .setTimestamp()
            .setFooter({ text: `👍 ${data.upvotes} 💬 ${data.comments}` })

        let msg = await message.channel.send({
            embeds: [newEmbed],
            components: [row]
        })

        let filter = (i) => i.user.id === message.author.id;

        const collector = await msg.createMessageComponentCollector({
            filter,
            type: "BUTTON"
        })


        collector.on("collect", async(i) => {
            if (i.customId === "memerate") {
                await i.deferUpdate();
                let meme2 = await fetch("https://api.popcatdev.repl.co/meme")
                    .then(r => r.json())

                const emb2 = new MessageEmbed()
                    .setTitle(meme2.title)
                    .setURL(meme2.url)
                    .setColor('RANDOM')
                    .setImage(meme2.image)
                    .setTimestamp()
                    .setFooter(`👍 ${meme2.upvotes} 💬 ${meme2.comments}`)

                return msg.edit({
                    embeds: [emb2]
                })
            }
            if (i.customId === "memeclose") {
                return msg.delete();
            }
        })
    }
}