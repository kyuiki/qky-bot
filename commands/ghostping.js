
module.exports = {
	name: 'summon',
	description: 'Summon entity! (nonsense command)',
	aliases: [],
	args: false,
	usage: '<entity>',
	cooldown: 1,
	unusable: false,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		msg.channel.send("Object successfully summoned")
   }

};
