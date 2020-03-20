const request = require('request');
module.exports = {
	name: 'detect',
	description: 'Detect the nsfw image',
	aliases: ['dnsfw', 'detectimg'],
	args: false,
	usage: '<imagelink/attachment>',
	cooldown: 900,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		if(!process.env.IMAGGA_USER||!process.env.IMAGGA_PASS) return msg.reply(":warning: **Command Cant Be runned**\nPut User and password into your .env variable")
		var link = (args[0]||args[1]);
		if(msg.attachments.size){
			link = msg.attachments.array()[0].url;
		};
		if(!link) return msg.reply("put link or attachment!");
		var option = {
			url:`https://api.imagga.com/v2/categories/nsfw_beta?image_url=${link}`,
			auth:{
				user: process.env.IMAGGA_USER,
				pass: process.env.IMAGGA_PASS
			}
		};
		request(option, (err, res, body) =>{
			if(err) return console.log(err);
				let i, out = "", val = JSON.parse(body).result.categories;
				for(i = 0;i<val.length;i++){
					out += `> **${val[i].name.en}** is **${Math.round(val[i].confidence)} %**\n\`[${bar(val[i].confidence)}] ${Math.round(val[i].confidence)}%\`\n`
				}
				msg.channel.send({embed:{title:"NSFW Detection Result.", description: out, color: 0xef8922}})
		})
	}
};
function bar(a){
	let out = "",i= Math.round(a / 5), j = 20 - i;
	while(i){
		out += "■";
		i--;
	}
	while(j){
		out += " ";
		j--;
	}
	return out;
}