module.exports = {
	name: 'svld',
	description: 'Lock the server down',
	aliases: ['svlock'],
	args: false,
	usage: '<true>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		const messages = msg.content.split(' ').slice(1).join(' ');
		if(messages){
				return msg.channel.send(`Server has been hotel :v wkwkw"`)
			}
		msg.channel.send(":warning: **WARNING!** :warning:\n are you sure to Lock this server down?? This action is __irreversible!__ Type ``yes`` To Continue...").then(() => {
			const filter = m => msg.author.id === m.author.id && msg.content.toLowerCase() === "yes";
			msg.channel.awaitMessages(filter, {time: 30000, max: 1, errors: ['time']})
			.then(message => {
				msg.channel.send(`<a:loading:695871544676843631> Please Wait while Locking everything in this server..."`)
			}).catch(() => {
				msg.channel.send("Tapi Boong!! :v")
			})
		})
	}
};