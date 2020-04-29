exports.run = async (client, channelID, fnName, data1, data2, data3) => {
     const channel = client.channels.cache.get(channelID);
     if (!channel) return console.log('err not found channel named log-channel');
     switch(fnName){
     	case 'detectNewUser':
     	detectNewUser(data1, data2);
     	console.log("Runned the detectNewUser function");
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
            description : warn + timeDif,
            color : color,
            timestamp : new Date()
  		}})
	}
}