const Booru = require("booru"),
Discord = require('discord.js');
const sitelist = ["e6","e621","e9","e926","hh","hypno","hypnohub","db","dan","danbooru","kc","konac","kcom","kn","konan","knet","yd","yand","yandere","gb","gel","gelbooru","r34","rule34","sb","safe","safebooru","tb","tbib","big","xb","xbooru","lb","lol","loli","lolibooru","pa","paheal","dp","derp","derpi","derpibooru","fb","furrybooru","rb","realbooru"]

module.exports = {
	name: 'booru',
	description: 'Search the image through Booru\'s site',
	aliases: ['br'],
	args: false,
	usage: '<sites> <tag1,tag2,tag3>',
	cooldown: 3,
	nsfw: true,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		let site = args[0],
		embed = new Discord.MessageEmbed().setTitle("Booru Error").setColor("#ed2222");
		if(!site||!sitelist.includes(site)) return msg.channel.send(embed.setDescription('Sorry But the Sites doesnt found. Try this instead\n```'+sitelist.join(', ')+'```\ngood luck'));
		if(!args[1]) return msg.channel.send(embed.setDescription('Sorry but you didnt send any tags. also use Comma "," to separate the tags (dont use Space!).\n__Example__ : `sex,pussy,cute1'));
		let tags = args[1].split(",");
		if(tags.length > 3) return msg.channel.send(embed.setDescription("Max tags is 3!"));
		Booru.search(site, tags, {limit: 1, random: true}).then(posts =>{
            for(let post of posts){
            	if(!post.fileUrl) return msg.channel.send(embed.setDescription("Sorry. We cant find the image with that tags. try use the different tags"));
            	let rating = "";
            	switch(post.rating){
            		default: rating = "Unknown";break;
            		case "e": rating = ":warning: Explicit! Absolutely Not Safe For Work";break;
            		case "q": rating = ":question: Questionable? Its literally Not Safe";break;
            		case "s": rating = ":white_check_mark: Safe. Its safe for you.";break;
            	};
            	msg.channel.send(`**Rating** : \n> ${rating}\n**Tags** : \n> \`${post.tags.join(", ")}\`\n**Link** :\n> ${post.fileUrl}`);
            }
		})
	}
}