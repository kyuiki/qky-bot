
module.exports = {
	name: 'stealname',
	description: 'steal someone name',
	aliases: ['sn',  'stealnick'],
	args: true,
	usage: '<mention a user>',
	cooldown: 60,
	nsfw: false,
	unusable: false,
	guildOnly: true,
	needPerms: {
		bool: true,
		permission : ["CHANGE_NICKNAME"]
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
		var person = msg.mentions.members.first() /*|| msg.client.users.cache.get(args[0])*/;
		console.log(person.displayName);
		msg.member.setNickname(person.displayName);
   }

};
