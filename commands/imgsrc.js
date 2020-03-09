const {google} = require("reverse-image-search");

module.exports = {
	name: 'reverse',
	description: 'Search By Image',
	aliases: ['rev', 'imgsrc'],
	args: false,
	usage: '<imageUrl/Attachments>',
	cooldown: 3,
	nsfw: false,
	unusable: true,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(msg, args){
		var link = (args[0]||args[1]);
		if(msg.attachments.size){
			link = msg.attachments.array[0].url;
		}
		google.searchByImageURL({
			imageURL: link
		}).then(res =>{
			console.log("Resulttt");
			console.log(res);
			msg.channel.send(res);
		}).catch(err =>{
			console.log("Noooooo");
			console.log(err);
			msg.channel.send(err);
		});
   }

};
