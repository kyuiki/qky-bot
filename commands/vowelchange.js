module.exports = {
	name: 'vowel',
	description: 'change the vowel',
	aliases: ['henyeh','vw'],
	args: true,
	usage: '<a/e/i/o/u> <a message>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		if(args[0].length > 1) return msg.delete();
		const messages = msg.content.split(' ').slice(2).join(' ').replace(/a|e|i|o|u/gi, args[0]);
		msg.channel.send(`**__${msg.member.displayName}__ said :** \n"${messages}"`);
		msg.delete();
	}
};