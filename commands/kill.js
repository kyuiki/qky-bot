const kill = require("../functions/json/misc.json");

module.exports = {
	name: 'slap',
	description: 'slap them in the face',
	aliases: [],
	args: false,
	usage: '<test>',
	cooldown: 3,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(!args[0]) return msg.channel.send("please Mention someone");
		var person = args[0] || args[1];
		msg.channel.send(`**${person} got slapped soo hard and he become unconscious**`);

   }

};
