module.exports = {
	name: 'say',
	description: 'Say something for this bot',
	aliases: ['talk'],
	args: false,
	usage: '<a message>',
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
				return msg.channel.send(`**__${msg.member.displayName}__ said :** \n"${messages}"`)
			}
		msg.channel.send("Please write a Letter. i will resend it").then(() => {
			const filter = m => msg.author.id === m.author.id;
			msg.channel.awaitMessages(filter, {time: 30000, max: 1, errors: ['time']})
			.then(message => {
				msg.channel.send(`**__${msg.member.displayName}__ said :** \n"${message.first().content}"`)
			}).catch(() => {
				msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!")
			})
		})
	}
};