const foo = "bar";

module.exports = {
	name: 'delete',
	description: 'Bulk delete the messages',
	aliases: ['del', 'clean', 'bulk'],
	args: true,
	usage: '<number of messages>',
	cooldown: 3,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: true,
		permission : ["ADMINISTRATOR"]
	},
	ownerOnly: false,
	execute(client, msg, args){
		let total = (args[0] || args[1]) - -1;
		if(total<2){
			msg.channel.send("That is too low! min 1!")
		}else if(total>100){
			msg.channel.send("That is too high! max 99!")
		}else{
		msg.channel.bulkDelete(total);
		msg.channel.send(`Deleted ${total - 1} messages!`).then(m => m.delete({timeout:6000}));
		}
	}
};