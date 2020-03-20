const superagent = require("superagent");
const list = {
    "randomgif": "/img/Random_hentai_gif",
    "pussy": "/img/pussy",
    "nekogif": "/img/nsfw_neko_gif",
    "neko": "/img/lewd",
    "lesbian": "/img/les",
    "kuni": "/img/kuni",
    "cum": "/img/cum",
    "classic": "/img/classic",
    "boobs": "/img/boobs",
    "blowjob": "/img/bj",
    "anal": "/img/anal",
    "avatar": "/img/nsfw_avatar",
    "yuri": "/img/yuri",
    "trap": "/img/trap",
    "tits": "/img/tits",
    "girlsologif": "/img/solog",
    "girlSolo": "/img/solo",
    "smallboobs": "/img/smallboobs",
    "pussywankgif": "/img/pwankg",
    "pussyart": "/img/pussy_jpg",
    "kemonomimi": "/img/lewdkemo",
    "kitsune": "/img/lewdk",
    "keta": "/img/keta",
    "holo": "/img/hololewd",
    "holoero": "/img/holoero",
    "hentai": "/img/hentai",
    "futanari": "/img/futanari",
    "femdom": "/img/femdom",
    "feetgif": "/img/feetg",
    "erofeet": "/img/erofeet",
    "feet": "/img/feet",
    "ero": "/img/ero",
    "erokitsune": "/img/erok",
    "erokemonomimi": "/img/erokemo",
    "eroneko": "/img/eron",
    "eroyuri": "/img/eroyuri",
    "cumarts": "/img/cum_jpg",
    "blowjob": "/img/blowjob",
    "pussygif": "/img/pussy"
};
module.exports = {
	name: 'nsfw',
	description: 'show the nsfw images (need NSFW marked Channel)',
	aliases: ['bokep', 'hentai', 'mantup2'],
	args: true,
	usage: '<type/genre>',
	cooldown: 3,
	nsfw: true,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		let type = (args[0]||args[1]).toLowerCase();
		if(!Object.keys(list).includes(type)) return msg.channel.send({embed:{title:"Not Found!",color: 0xef2222, description:`Sorry but your argument is wrong. But try this instead\n\`\`\`${Object.keys(list).join(", ")}\`\`\``}});
		superagent.get('https://nekos.life/api/v2'+list[type]).end((err, res) =>{
			if(res) return msg.channel.send(res.body.url);
			console.log(err);
		})
   }
};
