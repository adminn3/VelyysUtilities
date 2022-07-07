// This will not work if you use this command, You need to change this file place to one of the folders in the folder "commands" to make this a real working command.
module.exports = {
    name: 'test',
    aliases: [],
    utilisation: '{prefix}test',

    execute(client, message, args) {

      const embed = new MessageEmbed()
        .setAuthor("This is the author.")
        .setTitle("This is the title.")
        .setDescription("This is the description.")
        .addFields(
          { name: "This is a field name.", value: "this is a field value." },
          { name: "This is a field name with inline 1.", value: "this is a field value with inline 1.", inline: true },
          { name: "This is a field name with inline 2.", value: "this is a field value with inline 2.", inline: true },
        )
        .setFooter("This is the footer.")
        .setTimestamp() // <=== This sets the time when the embed message was sent.
        // .setImage("") // <=== You need a link image/gif for an image.
        // .setThumbnail("") // <=== You need a link image/gif for the thumbnail.
        .setColor("RED") // <=== This sets the embed color. You can use HEX codes, or the code "RANDOM" for random colors.

      message.reply({ content: "This is a test.", embeds: [embed] });
          
    },
};