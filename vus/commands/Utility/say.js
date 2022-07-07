module.exports = {
    name: "say",  
    execute(message, args) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("lol no");
      message.delete();
      message.channel.send({ content: args.join(" ") });
    }
};
