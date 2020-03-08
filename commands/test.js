const superagent = require("superagent");
const list = {
    "randomHentaiGif": "/img/Random_hentai_gif",
    "pussy": "/img/pussy",
    "nekoGif": "/img/nsfw_neko_gif",
    "neko": "/img/lewd",
    "lesbian": "/img/les",
    "kuni": "/img/kuni",
    "cumsluts": "/img/cum",
    "classic": "/img/classic",
    "boobs": "/img/boobs",
    "bJ": "/img/bj",
    "anal": "/img/anal",
    "avatar": "/img/nsfw_avatar",
    "yuri": "/img/yuri",
    "trap": "/img/trap",
    "tits": "/img/tits",
    "girlSoloGif": "/img/solog",
    "girlSolo": "/img/solo",
    "smallBoobs": "/img/smallboobs",
    "pussyWankGif": "/img/pwankg",
    "pussyArt": "/img/pussy_jpg",
    "kemonomimi": "/img/lewdkemo",
    "kitsune": "/img/lewdk",
    "keta": "/img/keta",
    "holo": "/img/hololewd",
    "holoEro": "/img/holoero",
    "hentai": "/img/hentai",
    "futanari": "/img/futanari",
    "femdom": "/img/femdom",
    "feetGif": "/img/feetg",
    "eroFeet": "/img/erofeet",
    "feet": "/img/feet",
    "ero": "/img/ero",
    "eroKitsune": "/img/erok",
    "eroKemonomimi": "/img/erokemo",
    "eroNeko": "/img/eron",
    "eroYuri": "/img/eroyuri",
    "cumArts": "/img/cum_jpg",
    "blowJob": "/img/blowjob",
    "pussyGif": "/img/pussy"
}

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
	execute(msg, args){
		let type = "";
		switch((args[0]||args[1]).toLowerCase()){
			case "neko":type=list.neko;break;
			case "nekogif":type=list.nekoGif;break;
			case "randomgif":type=list.randomHentaiGif;break;
			case "kuni":type=list.kuni;break;
			case "yuri":type=list.yuri;break;
			case "trap":type=list.trap;break;
			case "kitsune":type=list.kitsune;break;
			case "holo":type=list.holo;break;
			case "erokemonomimi":type=list.eroKemonomimi;break;
			case "lesbian":type=list.lesbian;break;
			case "cum":type=list.cumsluts;break;
			case "keta":type=list.keta;break;
			case "femdom":type=list.femdom;break;
			case "anal":type=list.anal;break;
			case "futa":type=list.futanari;break;
			case "blowjob":type=list.bJ;break;
			default: type=404;
		}
		if(type == 404) return msg.channel.send({embed:{title:"Not Found!", description:`Sorry. That type isnt here. Instead. try this below to fill the (args[0]) bellow\n\`\`\`neko, nekogif, randomgif, kuni, yuri, trap, kitsune, holo, erokemonomimi, lesbian, cum, keta, femdom, anal, futa, blowjob\`\`\``, color: 0xef2222}})

		superagent.get('https://nekos.life/api/v2'+type).end((err, res) =>{
			if(res) return msg.channel.send(res.body.url);
			console.log(err);
		})
   }
};
