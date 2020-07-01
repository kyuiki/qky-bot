const discord = require('discord.js'),
req  = require("request");
const fs = require('fs');

exports.run = async (client, logID, old, now) => {
	//check if the user has administator perm
	//if(!name.member.hasPermission("ADMINISTRATOR")) return;
	var hoist = ["!", ",", ".", "*", "="]

	//check if member has ! , . * = 
	hoist.forEach( h => {
		if(now.displayName.startsWith(h)) return now.setNickname(`[]`)
	})
	var str = " abcdefghijklmnopqrstuvwxyz1234567890\\.\\@\\#\\$\\%\\&\\*\\+\\(\\)\\!\"'\\:\\;\\/\\?\\~\\`\\{\\}\\^\\_\\=\\<\\>";
	var str1 = new RegExp(`[^${str.split("").join("|")}]`, "gi");
	var exmname = now.displayName;
	var isZalgo = exmname.replace(str1, ""), isEmojis = isEmoji(exmname);
	//console.log(isZalgo+" <===  Fixed! || Fucking Sucks!   ===> "+exmname);
	if(!isZalgo.replace(/\s/g, "")) return req({
		url:"https://api.namefake.com/indonesian-indonesia/male"
	}, (err, res, body) =>{
		if(err) return; 
		logging(client, logID, old, now, JSON.parse(body).name);
		now.setNickname(JSON.parse(body).name)
	})
	if(exmname.match(str1)) {now.setNickname(isZalgo); console.log("Changed! :)"); logging(client, logID, old, now, isZalgo);};
}

function isEmoji(str) {
    var ranges = [
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
    ];
    return str.replace(ranges.join('|'), "")
}
function logging(client, logID, old, now, result) {
	client.channels.cache.get(logID).send({embed:{
	  			title: "Zalgo Nickname Detected!",
				author: {
	                name: now.user.tag,
	                icon_url: now.user.avatarURL({format: 'png',dynamic: true})
	            },
	            description : `**Before** :\n> ${old.displayName}\n **After (not fixed)** :\n> ${now.displayName}\n **After (Fixed)** :\n> ${result}\nWhen you see this message its mean someone has a zalgo name in it. Pretty cool HUH?`,
	            color : 0x22a9fd,
	            timestamp : new Date()
	  		}})
}