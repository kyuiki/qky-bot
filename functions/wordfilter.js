const discord = require('discord.js');
const fs = require('fs');
const wordList = require("./json/wordconfig.json");
const Filter = require("bad-words"),
	filter = new Filter({placeholder: '*'});
	filter.removeWords();

exports.run = async (client, logId, msg, old) => {
	//check if the user has administator perm
	if(!msg.member.hasPermission("ADMINISTRATOR")) return;
    //the string 
    var str = msg.content.toLowerCase(), chance = Math.ceil(Math.random()*20)+15+" %";
    let before = "";
    if(old){
        before = `**Before** :\n> ${old.content}\n**After** :\n`;
    }

    //filter 1 (loosen but agressive)
    var wl_wl = wordList.words.wordlist, an_wl = wordList.words.animalword, sw_wl = wordList.words.sepi.split(", "),
    wl_bool = false,an_bool = false,filter1=false;
    for(var i in wl_wl){
        if(str.match(new RegExp(wl_wl[i], "gi")))
            wl_bool=true;
    }
    for(var i in an_wl){
        if(str.match(new RegExp(an_wl[i], "gi")))
            an_bool=true;
    }
    if(wl_bool||(an_bool && !str.includes("hewan"))){
            msg.delete();
            msg.channel.send("**BADWORD DETECTED!**\nPrototype: *kesalahan? segera laporkan ke Qky!*")
            client.channels.cache.get(logId).send({
                embed:{
                        title:"Filter ke 1 (Sepertinya akurat)!",
                        description: before+"> "+str+"\nBadWord? : `"+wl_bool+"`\nAnimalWord? : `"+an_bool+`\`\nMereka bilang seperti itu di channel <#${msg.channel.id}>. Dia adalah <@${msg.author.id}>`,
                        color:0xfa1212,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.member.user.avatarURL({format: 'png',dynamic: true}),
                        },
                    }
                });
            if(an_bool && !str.includes("hewan")) msg.channel.send("Oh ok gunakan **hewan** lain kali");
            filter1 = true;
    }

    //filter 2 (strong but weak)
    if(true) return;
    chance = Math.ceil(Math.random()*20)+5+" %";
	//split the word
	if(str.search(/\r|\n/)){
		str = str.split(/\r|\n/).join("");
	}
	if(str.includes(" ")){
		str = str.split(" ").join("");
	}

	//badword start in here
	var result = "";
    //animal word start in here
    var animal = "";
    //sepiiiiiiii
        if((animal.isBad && !str.includes("hewan")) || result.isBad){
            client.channels.cache.get(logId).send({
                embed:{
                        title:"Filter ke 2  (Questionable)!",
                        description: before+"> "+animal.output+"\nBadWord? : `"+result.isBad+"`\nAnimalWord? : `"+animal.isBad+"\nChance Dipenjara : "+chance+`\nMereka bilang seperti itu di channel <#${msg.channel.id}>. Dia adalah <@${msg.author.id}>`,
                        color:0xfa9812,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.member.user.avatarURL({format: 'png',dynamic: true}),
                        },
                    }
                });
        }

}

function badFilter2(input, list){
    var pattern = new RegExp(``, "gi")
}