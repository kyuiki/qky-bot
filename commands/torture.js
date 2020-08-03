
module.exports = {
	name: 'torture',
	description: 'Prison but its powerful',
	aliases: ['siksa', 'tpris', 'isolation', 'roast', 'introgasi'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	unusable: false,
	guildOnly: true,
	needPerms: {
		bool: true,
		permission : ["ADMINISTRATOR"]
	},
	ownerOnly: false,
	async execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
        var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("penjara")).id;
        var tortureID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("torture")).id;
        if(!roleID || !tortureID) msg.channel.send(":warning: **TIDAK DAPAT MENEMUKAN ROLE (torture) & (penjara)!**");
		var person = msg.mentions.members.first() /*|| msg.client.users.cache.get(args[0])*/;
		if(person.id == msg.member.id || person.hasPermission("ADMINISTRATOR")) return msg.channel.send(":x: Kamu tidak boleh melakukan itu untuk dirimu sendiri / Sesama mu :(");
		console.log(person.roles.cache.has(roleID))
		console.log("WTF!!! Someone run this command")
		await person.roles.remove(msg.guild.roles.cache.array(), `Di jalankan oleh ${msg.member.displayName}`);
		await person.roles.add(roleID);
		await person.roles.add(tortureID);
		msg.channel.send(`**${person.displayName} Dikirim dan di Introgasi.**\n*Semua role yang dia punya dilepas dan di ganti menjadi penjara dan torture yang hanya bisa dilihat oleh Administrasi*`);
   }

};
