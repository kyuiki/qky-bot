
module.exports = {
	name: 'ghostping',
	description: 'ghostpinging isnt allowed!!',
	aliases: ['gp'],
	args: false,
	usage: '<args>',
	cooldown: 1,
	unusable: true,
	nsfw: false,
	guildOnly: true,
	adminOnly: true,
	ownerOnly: false,
	execute(client, msg, args){
		msg.delete()
   }

};
