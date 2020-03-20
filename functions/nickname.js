const discord = require('discord.js');
const fs = require('fs');

exports.run = (client, old, now) => {
	//check if the user has administator perm
	//if(!name.member.hasPermission("ADMINISTRATOR")) return;
	var hoist = ["!", ",", ".", "*", "="]

	//check if member has ! , . * = 
	hoist.forEach( h => {
		if(now.displayName.startsWith(h)) return now.setNickname(`[Tinggi] ${old.displayName}`)
	})
}