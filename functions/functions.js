const req = require("request");

exports.run = async (client, channelID, fnName, data1, data2, data3) => {
     const channel = client.channels.cache.get(channelID);
     if (!channel) return console.log('err not found channel named log-channel');
     switch(fnName){
     	case 'detectNewUser':
     	detectNewUser(data1, data2);
     	console.log("Runned the detectNewUser function");
     	break;
     	case 'detectLeavingUser':
     	detectLeavingUser(data1, data2);
     	console.log("Runned the detectLeavingUser function");
     	break;
     	case 'dramaWritter':
     	dramaWritter(data1, data2);
     	console.log("Runned the dramaWritter function");
     	break;
     	case 'attachment':
     	attachment(data1, data2);
     	console.log("Runned the attachment function");
     	break;
     	case 'modLog':
     	modLog(data1, data2);
     	console.log("Runned the modLog function");
     	break;
     }


	function detectNewUser(a, b, c){
     	const origin = client.channels.cache.get(b);
     	if (!channel) return console.log('err not found channel named log-channel');

		let info = client.users.cache.get(a), warn = "", color = 0x22df22;
		let createdAt = new Date(client.users.cache.get(a).createdAt),
		joinedAt = new Date(origin.guild.members.cache.get(a).joinedAt), 
		distance = joinedAt.getTime() - createdAt.getTime(),
  		days = Math.floor(distance / (1000 * 60 * 60 * 24)),
  		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  		seconds = Math.floor((distance % (1000 * 60)) / 1000),
  		timeDif = `Akun dibuat : ${createdAt.toUTCString()}\nBergabung : ${joinedAt.toUTCString()}\nSelisih Bergabung dengan dibuat : ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
  		
  		if(minutes <= 10 && hours <= 0 && days <= 0){
  			warn += `:warning: **PERINGATAN AKUN BARU!** :warning:\n`,
  			color = 0xdf2222;
  		}
  		if(!info.avatarURL({format: 'png',dynamic: true})){
  			warn += `:warning: **TIDAK PUNYA FOTO PROFIL!** :warning:\n\n`,
  			color = 0xdf9222;
  		}
  		channel.send(warn, {embed:{
  			title: "Member bergabung!",
			author: {
                name: info.tag,
                icon_url: info.avatarURL({format: 'png',dynamic: true}),
            },
            description : warn + timeDif ,
            color : color,
            timestamp : new Date()
  		}})
	}

	function detectLeavingUser(a, b, c){
     	const origin = client.channels.cache.get(b);
     	if (!channel) return console.log('err not found channel named log-channel');

		let info = client.users.cache.get(a.id), warn = "", color = 0xdfdf22;
		let createdAt = new Date(),
		joinedAt = new Date(a.joinedAt), 
		distance = createdAt.getTime() - joinedAt.getTime(),
  		days = Math.floor(distance / (1000 * 60 * 60 * 24)),
  		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  		seconds = Math.floor((distance % (1000 * 60)) / 1000),
  		timeDif = `Keluar : ${createdAt.toUTCString()}\nBergabung : ${joinedAt.toUTCString()}\nSelisih Bergabung dengan keluar : ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
  		
  		if(minutes <= 10 && hours <= 2 && days <= 0){
  			warn += `:warning: **KELUAR TERLALU CEPAT!\nAkan diban dan dialihkan ke server ini** :warning:\n`;
			color = 0xdf2222;
			a.ban();
			a.user.send("Kamu Diban Di karenakan kamu keluar terlalu Cepat! Untuk melepaskan ban Harap Join server ini https://discord.gg/KcwMwnz");
  		}
  		if(!info.avatarURL({format: 'png',dynamic: true})){
  			warn += `:warning: **TIDAK PUNYA FOTO PROFIL!** :warning:\n\n`;
  		}
  		channel.send(warn, {embed:{
  			title: "Member Keluar!",
			author: {
                name: info.tag,
                icon_url: info.avatarURL({format: 'png',dynamic: true}),
            },
            description : warn + timeDif ,
            color : color,
            timestamp : new Date()
  		}})
	}

	function attachment(a, b, c){
		let data = [];
		if(!a.attachments.size) return;

		for(var i = 0; i<a.attachments.size; i++){
			data.push(a.attachments.array()[i].url);
		}
  		channel.send(`${a.member.displayName} (${a.author.tag})\nIn Channel (${a.channel})\n> ${a.content.replace( /<@!?\d+>/gi , "@mention")}`, {files: data})
	}
	function dramaWritter(a,b,c){
		if(a.channel.id == "660661778597806101"){
				console.log("Drama!")
				let content = {
					content : a.content,
					username : a.member.displayName,
					avatar_url : a.author.avatarURL()
				};
				req.post({
					url :process.env.DWebhook,
					body : JSON.stringify(content),
					headers: {"content-type" : "application/json"}
				}, (err, res, body) => {
					if(err) return console.log(err);
					console.log(body)
				})
			}
	}
}