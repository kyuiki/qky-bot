const kill = require("../functions/json/misc.json");

module.exports = {
	name: 'kill',
	description: 'kill someone',
	aliases: [],
	args: false,
	usage: '<test>',
	cooldown: 3,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
		var person = args[0] || args[1],
		randomizer = kill.kill[Math.floor(Math.random()*kill.kill.length)],
		victim = randomizer.replace("%1$s", person),
		subject = victim.replace("%2$s", `<@${msg.author.id}>`),
		result = subject.replace("%3$s", "Arrow");
		msg.channel.send(`**${result}**`);

   }

};
