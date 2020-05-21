module.exports = {
	name: 'invgen',
	description: 'invite generator! (ownerOnly)',
	aliases: ['invgene'],
	args: false,
	usage: '',
	cooldown: 1,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: true,
	execute(client, msg, args){
		try{
			console.log("hi Test "+times());
			var tes = setInterval(function(){client.fetchInvite(times(1)).then(function(inv){
						clearInterval(tes);
						console.log(inv);
						msg.channel.send(`Founded\n${inv.guild.name}\n${inv.channel.name}\n${inv.memberCount}\n${inv.inviter}\nthis is what you want! the invite code is ${inv.code}`)
						}).catch(function(err){console.log("Wtf is this invite didnt shown up!")});}, 200)
			console.log("end of scirpt")}catch(err){
				console.log("errororororororoor");
				console.log(err)
			}
	}
};


	   function nitrocode(length, letter) {
	    var multiplier = '';
	    if (letter.indexOf('0') > -1) multiplier += '0123456789';
	    if (letter.indexOf('A') > -1) multiplier += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    if (letter.indexOf('a') > -1) multiplier += 'abcdefghijklmnopqrstuvwxyz';
	    if (letter.indexOf('#') > -1) multiplier += '!@#$%^&*()_-+={}[]|:;",<>.?/`~'
	    var results = '';
	     for (var i = length; i > 0; --i) {
	     results += multiplier[Math.floor(Math.random() * multiplier.length)]; }
	      return results; 
	  }
	  function times(times){
	  		return "https://discord.gg/" + nitrocode(7,'0aA');
	  }