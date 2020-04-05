 const mojang = require("mojang-api");

module.exports = {
	name: 'minecraft',
	description: 'Search Minecraft Java User',
	aliases: ['mc'],
	args: true,
	usage: '<username>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		mojang.nameToUuid((args[0]||args[1]), function(err, res){
			try{
				proccess1(res, msg);
			}
			catch(error){
			console.log(error);
			msg.channel.send({embed:{
				title:"Player Not Found",
				author:{
					name:"Minecraft Command Error", 
					icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
				},
				description: "Please put the proper minecraft Username **WITHOUT** Space or any Special Character!\n:mag: You was searching for : __"+(args[0]||args[1])+"__",
				color: 0xff2121
			}})
			}
		});
	}
}
	function proccess1(res1, msg){
		var konten = "";
			mojang.nameHistory(res1[0].id, function(err,res){
				if(res.length < 2|| !res.length){
					konten += "No recently changes!";
				}else{
					var last = res.length;
					while(last){
						last--;
						konten += `> **${res[last].name}**\n Changed at *${new Date(res[last].changedToAt)}*\n`;
					}
				}
					proccess2(res1, konten, msg);
			});
	}
	function proccess2(res, history, msg){
			const exampleEmbed = {
			color: 0x553bd9,
			title: 'Minecraft Username Detail',
			author: {
				name: res[0].name,
				icon_url: 'https://crafatar.com/avatars/'+res[0].id+".png",
			},
			description: 'Player Information :',
			thumbnail: {
				url: 'https://crafatar.com/renders/head/'+res[0].id+".png",
			},
			fields: [
				{
					name: 'Name :',
					value: res[0].name,
					inline: false,
				},
				{
					name: 'UUID :',
					value: res[0].id,
					inline: false,
				},
				{
					name: 'Name History :',
					value: history,
					inline: false,
				},
				{
					name: 'Skin :',
					value: `[Click Here To Get Link!](https://crafatar.com/skins/${res[0].id}.png)`,
					inline: false,
				},
			],
			image: {
				url: 'https://crafatar.com/skins/'+res[0].id+".png",
			},
			timestamp: new Date(),
		};
	msg.channel.send({ embed: exampleEmbed });
}