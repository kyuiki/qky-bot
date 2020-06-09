const codejson = require("../functions/json/codelist.json");
//require('dotenv-flow').config();

module.exports = {
	name: 'code',
	description: 'Masukan Kode untuk tugas terbaru',
	aliases: ['tugas', 'reedem', 'kode'],
	args: true,
	usage: '<code>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){

		/*if(!process.env.JSONSKEY) return;
		request({
			headers : {
				"secret-key" : process.env.JSONSKEY
			},
			url: "https://api.jsonbin.io/b/5e912c9e172eb6438961dcd9/1"
		}, (err, res, body)=>{*/
			var cari = codejson.find(c => c.code == (args[0]||args[1]));
			if(!cari) return msg.channel.send("Kode yang anda masukan. SALAH! Silahkan Coba lagi nanti.");
			if(!cari.rahasia){
				msg.delete();
				msg.channel.send({embed:cari.embed});
			}else{
				msg.delete();
				msg.channel.send("Sebuah Rahasia Telah dikirim Lewat DM :)");
				msg.author.send({embed:cari.embed});	
			}
	}
};