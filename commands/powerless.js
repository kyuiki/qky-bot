
module.exports = {
	name: 'powerless',
	description: 'give/remove player powerless',
	aliases: ['kutuk', 'pless', 'curse'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	unusable: false,
	guildOnly: true,
	needPerms: {
		bool: true,
		permission : ["VIEW_AUDIT_LOG", "MANAGE_NICKNAMES"]
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
        var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("powerless")).id;
        if(!roleID) msg.channel.send(":warning: **TIDAK DAPAT MENEMUKAN ROLE POWERLESS!**");
		var person = msg.mentions.members.first() /*|| msg.client.users.cache.get(args[0])*/;
		console.log(person.roles.cache.has(roleID))
		if(!person.roles.cache.has(roleID)){
			person.roles.add(roleID);
			msg.channel.send(`**Dikutuk ${person.displayName} menjadi Powerless**`);
		}else{
			person.roles.remove(roleID);
			msg.channel.send(`**Telah diangkat ${person.displayName} dari kutukan Powerless**`);
		}
   }

};
