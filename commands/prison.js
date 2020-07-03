
module.exports = {
	name: 'prison',
	description: 'put the user into prison',
	aliases: ['gulag', 'pris', 'penjara', 'culik'],
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
        var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("penjara")).id;
        if(!roleID) msg.channel.send(":warning: **TIDAK DAPAT MENEMUKAN ROLE PRISONER!**");
		var person = msg.mentions.members.first() /*|| msg.client.users.cache.get(args[0])*/;
		console.log(person.roles.cache.has(roleID))
		if(person.id == msg.member.id || person.hasPermission("ADMINISTRATOR")) return msg.channel.send(":x: Kamu tidak boleh melakukan itu untuk dirimu sendiri / Sesama mu :(");
		if(!person.roles.cache.has(roleID)){
			person.roles.add(roleID);
			msg.channel.send(`**${person.displayName} dimasukan ke dalam Mobil dan di karungin**`);
		}else{
			person.roles.remove(roleID);
			msg.channel.send(`**Dibebaskan ${person.displayName} dari penjara**`);
		}
   }

};
