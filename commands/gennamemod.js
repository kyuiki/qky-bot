const req = require("request");
module.exports = {
	name: 'changegen',
	description: 'change People name with Generated name',
	aliases: ['cpgn', 'cpn'],
	args: true,
	usage: '<mention> <male/female>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: true,
	ownerOnly: false,
	execute(client, msg, args){
		var person  = msg.mentions.members.first();
		if((args[1]||args[2]) === "male") return req({
			url:"https://api.namefake.com/indonesian-indonesia/male"
		}, (err, res, body) =>{
			person.setNickname(JSON.parse(body).name)
		})
		if((args[1]||args[2]) === "female") return req({
			url:"https://api.namefake.com/indonesian-indonesia/female"
		}, (err, res, body) =>{
			person.setNickname(JSON.parse(body).name)
		})
		msg.channel.send("there is only male and female")

	}
};
