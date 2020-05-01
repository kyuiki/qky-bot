const req = require("request");
module.exports = {
	name: 'namegen',
	description: 'Generate your name',
	aliases: ['ng', 'genname'],
	args: true,
	usage: '<male/female>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		try{
		if((args[0]||args[1]) === "male") return req({
			url:"https://api.namefake.com/indonesian-indonesia/male"
		}, (err, res, body) =>{
			if(err) return;
			msg.member.setNickname(JSON.parse(body).name);
		})
		if((args[0]||args[1]) === "female") return req({
			url:"https://api.namefake.com/indonesian-indonesia/female"
		}, (err, res, body) =>{
			if(err) return; 
			msg.member.setNickname(JSON.parse(body).name)
		})
		msg.channel.send("there is only male and female")
	}catch(err){
		console.log(err)
	}

	}
};
