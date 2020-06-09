
module.exports = {
	name: 'ping',
	description: 'ping the bot',
	aliases: ['p'],
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
msg.channel.send('Connecting to the network...').then((msg) => {
	var late = Date.now() - msg.createdTimestamp;
	msg.edit(`Edit Result : \`${late}\` ms\nShard Result : \`${msg.guild.shard.ping}\` ms.\nAPI Latency Result : \`${client.ws.ping}\` ms.`)})
   }

};
