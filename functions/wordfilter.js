const discord = require('discord.js');
const fs = require('fs');
const wordList = require("./json/wordconfig.json");
const Filter = require("bad-words"),
	filter = new Filter({placeholder: '*'});
	filter.removeWords();

exports.run = async (client, msg, old) => {
	//check if the user has administator perm
	if(msg.member.hasPermission("ADMINISTRATOR")) return;
    //the string 
    var str = msg.content.toLowerCase(), chance = Math.ceil(Math.random()*20)+15+" %";
    let before = "";
    if(old){
        before = `**Before** :\n> ${old.content}\n**After** :\n`;
    }

    //filter 1 (loosen but agressive)
    var wl_wl = Object.keys(wordList.words.wordlist), an_wl = Object.keys(wordList.words.animalword), sw_wl = Object.keys(wordList.words.sepi),
    wl_bool = false,an_bool = false,sw_bool = false,filter1=false;
    for(var i in wl_wl){
        if(str.includes(wl_wl[i].toLowerCase()))
            wl_bool=true;
    }
    for(var i in an_wl){
        if(str.includes(an_wl[i].toLowerCase()))
            an_bool=true;
    }
    for(var i in sw_wl){
        if(str.includes(sw_wl[i].toLowerCase()))
            sw_bool=true;
    }
    if(wl_bool||(an_bool && !str.includes("hewan"))||sw_bool){
            if(sw_bool){
                chance = "100 %";
                var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("prisoner"));
                if(!roleID) before += ":warning: **TIDAK DAPAT MENEMUKAN ROLE PRISONER!**\n";
                msg.member.roles.add(roleID);
                msg.member.setNickname("[RIP]"+msg.member.displayName);
                setTimeout(()=>{msg.member.roles.remove(roleID); msg.member.setNickname("")},3600000);
            }
            msg.delete();
            msg.channel.send({
                embed:{
                        title:"Filter ke 1 (Mostly Accurate)!",
                        description: before+"> "+str+"\nBadWord? : `"+wl_bool+"`\nAnimalWord? : `"+an_bool+"`\nS-Word? : `"+sw_bool+"`\nChance Dipenjara : "+chance,
                        color:0xfa1212,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.member.user.avatarURL({format: 'png',dynamic: true}),
                        },
                    }
                });
            filter1 = true;
    }

    //filter 2 (strong but weak)
    if(filter1) return;
    chance = Math.ceil(Math.random()*20)+5+" %";
	//split the word
	if(str.search(/\r|\n/)){
		str = str.split(/\r|\n/).join("");
	}
	if(str.includes(" ")){
		str = str.split(" ").join("");
	}

	//badword start in here
	var result = await Bad2Good(str, wordList.words.wordlist);
    //animal word start in here
    var animal = await Bad2Good(result.output, wordList.words.animalword);
    //sepiiiiiiii
    var sword = await Bad2Good(animal.output, wordList.words.sepi);
        if(sword.isBad || (animal.isBad && !str.includes("hewan")) || result.isBad){
            if(sword.isBad){
                chance = Math.ceil(Math.random()*20)+60+" %";
                msg.member.setNickname("[!]"+msg.member.displayName);
            }
            msg.channel.send({
                embed:{
                        title:"Filter ke 2  (Questionable)!",
                        description: before+"> "+sword.output+"\nBadWord? : `"+result.isBad+"`\nAnimalWord? : `"+animal.isBad+"`\nS-Word? : `"+sword.isBad+"`\nChance Dipenjara : "+chance,
                        color:0xfa9812,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.member.user.avatarURL({format: 'png',dynamic: true}),
                        },
                    }
                });
        }

}
function Bad2Good(text, wordlists){
        var T = wordlists,
        isBad = false;
        for (var prop in T)
        {
                var flags = 'ig';
        // case sensitive
                if (prop[prop.length - 1] == '!')
                {
                        flags = 'g';
                        prop = prop.substr(0, prop.length - 1);
                }
                // starts with
                if (prop[prop.length - 1] == '*')
                {
                        prop = '(\b)' + prop.substr(0, prop.length - 1) + '(\w*)(\b)';
                }
        // ends with
                if (prop[0] == '*')
                {
                        prop = '(\b)(\w*)' + prop.substr(1, prop.length) + '(\b)';
                }
                text = text.replace(new RegExp(prop, flags), function (match, len, p1)
                {
            var lookup;
            var replace;
            var good;
            if(Number.isInteger(len))
            {
                replace = match;
                lookup = match;
                isBad = true;
            }
            else
            {
                if(match.startsWith(p1))
                {
                    replace = match.replace(p1, '');
                    lookup = '*' + replace;
                }
                else
                {
                    replace = match.replace(p1, '');
                    lookup = replace + '*';
                }
            }
            good = T[lookup.toLowerCase()] || T[lookup + '!'];

            if(T[lookup + '!'] == undefined)
            {
                if((replace.toUpperCase() == replace))
                {
                    good = good.toUpperCase();
                }
                else if((replace.toLowerCase() == replace))
                {
                    good = good.toLowerCase();
                }
            }
            return(match.replace(replace, good));
                });
        }
        return ({
        	output :text,
        	isBad : isBad
        });
}
