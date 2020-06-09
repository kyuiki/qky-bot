
module.exports = {
	name: 'kick',
	description: 'kick the user',
	aliases: ['tendang'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	unusable: true,
	guildOnly: true,
	needPerms: {
		bool: true,
		permission : ["ADMINISTRATOR"]
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
		var person  = msg.mentions.users.first() /*|| msg.client.users.cache.get(args[0])*/;
		person.guild.ban();
   }

};
