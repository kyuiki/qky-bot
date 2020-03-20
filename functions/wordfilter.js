const discord = require('discord.js');
const fs = require('fs');
const wordList = require("./json/wordconfig.json");
const Filter = require("bad-words"),
	filter = new Filter({placeholder: '*'});
	filter.removeWords();

exports.run = async (client, msg, old) => {
	//check if the user has administator perm
	//if(msg.member.hasPermission("ADMINISTRATOR")) return;
    let before = "", chance = "20%";
    if(old){
        before = `**Before** :\n> ${old.content}\n**After** :\n`;
    }
	//split the word
	var str = msg.content.toLowerCase();
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
        if(sword.isBad || animal.isBad || result.isBad){
            msg.delete();
            if(sword.isBad){
                chance = "100 %";
                var roleID = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes("prisoner"));
                if(!roleID) before += ":warning: **TIDAK DAPAT MENEMUKAN ROLE PRISONER!**\n";
                msg.member.roles.add(roleID);
                msg.member.setNickname("[DIPENJARA]"+msg.member.displayName);
            }
            msg.channel.send({
                embed:{
                        title:"BLACKLISTED WORDS DETECTED!",
                        description: before+"> "+sword.output+"\nBadWord? : `"+result.isBad+"`\nAnimalWord? : `"+animal.isBad+"`\nS-Word? : `"+sword.isBad+"`\nChance Dipenjara : "+chance,
                        color:0xfa1212,
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
