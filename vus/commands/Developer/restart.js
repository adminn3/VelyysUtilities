const colors = require('colors')

module.exports = {
	name: 'restart',
	async execute(client, message, args) {
		if (message.author.id !== '501045011518062592') {
			return message.delete();
		}
		await message.channel.send('Restarting....');
		console.log(`${client.user.username} has been shutdown. - Console`.bold.red)
		return process.exit();
	},
};


