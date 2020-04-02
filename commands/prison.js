
module.exports = {
	name: 'prison',
	description: 'put the user into prison',
	aliases: ['gulag', 'pris', 'penjara'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	unusable: false,
	guildOnly: true,
	adminOnly: true,
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
        var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("prisoner")).id;
        if(!roleID) msg.channel.send(":warning: **TIDAK DAPAT MENEMUKAN ROLE PRISONER!**");
		var person = msg.mentions.members.first() /*|| msg.client.users.cache.get(args[0])*/;
		console.log(person.roles.cache.has(roleID))
		if(!person.roles.cache.has(roleID)){
			person.roles.add(roleID);
			msg.channel.send(`**${person.displayName} dimasukan ke penjara**`);
		}else{
			person.roles.remove(roleID);
			msg.channel.send(`**Dibebaskan ${person.displayName} dari penjara**`);
		}
   }

};
