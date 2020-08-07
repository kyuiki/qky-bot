const kill = require("../functions/json/misc.json");

module.exports = {
	name: 'slap',
	description: 'slap them in the face',
	aliases: ["tampar", "plak", "crot"],
	args: false,
	usage: '<test>',
	cooldown: 3,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("Kamu Tampar Diri ssendiri? *BRUH*");
		var person = args[0] || args[1],
		pesan = ["PLAK!!!", "*Aku di suruh dia yah.* //PLAK","**\\\*Ditampar dan dia tidak sadarkan diri**", "STOPPP Apa kamu tidak merasa kasihan sama dia <:3"];
		msg.channel.send(`${person} ${pesan[Math.floor(Math.random()*pesan.length)]}`);

   }

};
