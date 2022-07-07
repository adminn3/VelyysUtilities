// This will not work if you use this command, You need to change this file place to one of the folders in the folder "commands" to make this a real working command.
module.exports = {
    name: 'test',
    aliases: [],
    utilisation: '{prefix}test',

    execute(client, message, args) {

      message.reply({ content: "This is a test." });
          
    },
};