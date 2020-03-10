
module.exports = {
	name: 'kick',
	description: 'kick the user',
	aliases: ['tendang'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	unusable: true,
	guildOnly: true,
	adminOnly: true,
	ownerOnly: false,
	execute(msg, args){
msg.channel.send('Sorry. Still in progress')
   }

};
