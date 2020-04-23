/*exports.run = async (client, channelID, fnName, data1, data2, data3) => {
     const channel = client.channels.cache.get(channelID);
     if (!channel) return console.log('err not found channel named bot-channel');
     switch(fnName){
     	case 'detectNewUser':
     	detectNewUser(data1);
     	break;
     	case '';
     	break;
     }


	function detectNewUser(a, b, c){
		let createAt = new Date(client.users.cache.get(a).createAt),
		joinedAt = new Date(channel.guild.members.cache.get(a).joinedAt), 
		distance = joinedAt.getTime() - createAt.getTime();
  		days = Math.floor(distance / (1000 * 60 * 60 * 24)),
  		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  		seconds = Math.floor((distance % (1000 * 60)) / 1000),
  		timeDif = `Akun dibuat : ${createAt.toUTCString()}\nBergabung : ${joinedAt.toUTCString()}\n ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
  		console.log(timeDif)
	}
}*/