module.exports = {
	name: 'avatar',
	description: 'Get the user profile Picture',
	aliases: ['pfp', 'av'],
	args: false,
	usage: '<mention someone>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send(msg.author.avatarURL({format: 'png',dynamic: true}));
		var person  = msg.mentions.users.first() /*|| msg.client.users.cache.get(args[0])*/;
		msg.channel.send(person.avatarURL({format: 'png',dynamic: true}));
	}
};
