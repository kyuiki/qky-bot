module.exports = {
	name: 'eval',
	description: 'Run a code with eval',
	aliases: ['ev', 'run'],
	args: true,
	usage: '<line of codes>',
	cooldown: 3,
	nsfw: false,
	guildOnly: false,
	adminOnly: false,
	ownerOnly: true,
	execute(msg, args){
	const messages = msg.content.split(' ').slice(1).join(' ');
		try{
		let evaled = eval(messages);
		if(typeof evaled !== "string")
			evaled = require('util').inspect(evaled);
		msg.channel.send({embed :{ title : "Successfully runned!", color : 0x22ef22, description :  `\`\`\`xl\n${evaled}\`\`\``}});
}catch(err){msg.channel.send({embed :{ title : "Error Occured!", color : 0xef2222, description :  `\`\`\`xl\n${err}\n\`\`\``}});
   }
	}
};