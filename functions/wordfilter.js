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
    wl_bool = {word:"",bool:false},an_bool = {word:"",bool:false},filter1=false;
    for(var i in wl_wl){
        if(str.match(new RegExp(wl_wl[i], "gi")))
            wl_bool={
                bool: true,
                word: str.match(new RegExp(wl_wl[i], "gi"))
            };
    }
    for(var i in an_wl){
        if(str.match(new RegExp(an_wl[i], "gi")))
            an_bool={
                bool: true,
                word: str.match(new RegExp(an_wl[i], "gi"))
            };
    }
    if(wl_bool.bool||(an_bool.bool && !str.includes("hewan"))){
            msg.delete();
            if(wl_bool.bool) msg.reply(response("badword"))
            client.channels.cache.get(logId).send({
                embed:{
                        title:"Filter ke 1 (Sepertinya akurat)!",
                        description: before+"> "+str+"\nBadWord? : `"+wl_bool.bool+"`\nAnimalWord? : `"+an_bool.bool+`\`\nMereka bilang seperti itu di channel <#${msg.channel.id}>. Dia adalah <@${msg.author.id}>`,
                        color:0xfa1212,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.member.user.avatarURL({format: 'png',dynamic: true}),
                        },
                    }
                });
            if(an_bool.bool && !str.includes("hewan")) msg.reply(response("animalword"));
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

function response(input){
    var x = wordList.response[input];
    return x[Math.floor(Math.random()*x.length)];
}