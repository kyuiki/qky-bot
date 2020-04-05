module.exports = {
	name: 'reverse',
	description: 'Reverse the text',
	aliases: ['rvr', 'r'],
	args: false,
	usage: '<a message>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		const messages = msg.content.split(' ').slice(1).join(' ');
		if(messages){
				return msg.channel.send(`**__${msg.member.displayName}__ Result :** \n"${messages.split('').reverse().join('')}"`)
			}
		msg.channel.send("Please write a Letter. i will reverse it").then(() => {
			const filter = m => msg.author.id === m.author.id;
			msg.channel.awaitMessages(filter, {time: 60000, max: 1, errors: ['time']})
			.then(message => {
				msg.channel.send(`**__${msg.member.displayName}__ Result :** \n"${message.first().content.split('').reverse().join('')}"`)
			}).catch(() => {
				msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!");
			})
		})
	}
};