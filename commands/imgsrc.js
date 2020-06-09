//const {google} = require("reverse-image-search");

module.exports = {
	name: 'imagesearch',
	description: 'Search By Image',
	aliases: ['googleimg', 'imgsrc'],
	args: false,
	usage: '<imageUrl/Attachments>',
	cooldown: 3,
	nsfw: false,
	unusable: true,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
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
