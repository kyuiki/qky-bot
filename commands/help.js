const Discord = require('discord.js'),
 prefix = "/";

module.exports = {
	name: 'help',
	description: 'Show the list of the commands',
	aliases: ['commands', 'helps', '?'],
	args: false,
	usage: '<commands>',
	cooldown: 5,
	nsfw: false,
	guildOnly: false,
	adminOnly: false,
	ownerOnly: false,
	execute(msg, args){
		const data = new Discord.MessageEmbed().setTitle("Help Command").setTimestamp().setColor('#2375df'),
		{commands} = msg.client;

		if(!args.length){
			data.setDescription('here\'s list of all my commands');
			data.addField("**Commands List :**",commands.map(command => command.name).join(', '), true);
			data.addField("Info",`You can send \`/help [command name]\` to get more info about that command`, true);
			return msg.channel.send(data);
		}
		const name = args[0].toLowerCase(),
		command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		if(!command){
			return msg.reply("that's not a valid command!");
		}
		data.setDescription("This is the detail of the Command");
		data.addField(`**Name : **`, command.name, true);
		if(command.aliases) data.addField(`**Aliases :**`, command.aliases.join(', '), true);
		if(command.description) data.addField(`**Description :**`, command.description , true);
		if(command.usage) data.addField(`**Usage :**`, `${prefix}${command.name} ${command.usage}`, true);

		msg.channel.send(data);
	}
};