const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (interaction, pages, time = 60000) => {
    if (!interaction || !pages || !(pages?.length > 0) || !(time > 10000)) throw new Error("Invalid parameters");

    let index = 0, row = new MessageActionRow()
      .addComponents([new MessageButton({
        
        type: "BUTTON",
        customId: "1",
        label: "<",
        //emoji: "",
        style: "SECONDARY",
        disabled: true
    }), new MessageButton({
        type: "BUTTON",
        customId: "2",
        //label: ">",
        emoji: "925222391062347827",
        style: "SECONDARY",
        disabled: pages.length < 2
    }), new MessageButton({
        type: "BUTTON",
        customId: "3",
        //label: "#",
        emoji: "911432420144865351",
        style: "DANGER"
    })]);

    let data = {
        embeds: [pages[index]],
        components: [row],
        fetchReply: true
    };

    const msg = interaction.replied ? await interaction.followUp(data) : await interaction.reply(data);

    const col = msg.createMessageComponentCollector({
        filter: i => i.user.id === interaction?.user?.id || interaction?.author?.id,
        time
    });

    col.on('collect', (i) => {
        if (i.customId === "1") index--;
        else if (i.customId === "2") index++;
        else return col.stop();

        row.components = [
        new MessageButton({
            type: "BUTTON",
            customId: "1",
            label: "<",
            //emoji: "",
            style: "SECONDARY",
            disabled: index === 0
        }),
        new MessageButton({
            type: "BUTTON",
            customId: "2",
            label: ">",
            //emoji: "925222391062347827",
            style: "SECONDARY",
            disabled: index === pages.length - 1
        }),
      new MessageButton({
            type: "BUTTON",
            customId: "3",
            //label: "#",
            emoji: "911432420144865351",
            style: "DANGER"
        })];

        i.update({
            components: [row],
            embeds: [pages[index]]
        })
    });

    col.on('end', () => {
        msg.edit({
            components: []
        })
    })
}