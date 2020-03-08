const foo = "bar";

module.exports = {
	name: 'kick',
	description: 'kick the user',
	aliases: ['tendang'],
	args: true,
	usage: '<mention a user>',
	cooldown: 3,
	nsfw: false,
	guildOnly: true,
	adminOnly: true,
	ownerOnly: false,
	execute(msg, args){
msg.channel.send('Connecting to the network...').then((msg) => {
	var late = Date.now() - msg.createdTimestamp;
	msg.edit(`Edit Result : \`${late}\` ms\nShard Result : \`${msg.guild.shard.ping}\` ms.\nShard Result : \`${msg.guild.shard.ping}\` ms.`)})
   }

};
