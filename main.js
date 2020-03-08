const 	fs = require('fs'),
		Discord = require("discord.js"),
		client = new Discord.Client(),
		cooldowns = new Discord.Collection();
		require('dotenv-flow').config();
		require('events').EventEmitter.defaultMaxListeners = 0;

const {token , pref, owner} = {
	pref : process.env.PREFIX ,
	token : process.env.TOKEN ,
	owner : process.env.OWNER
};
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('Yey Im alive!');
	client.user.setActivity("Rewritten. my Prefix is "+pref, {url:'https://qkiemauln.github.io',type:"WATCHING"})
});

client.on('message', (msg) =>{
	if(!msg.content.startsWith(pref) || msg.author.bot) return;
	const args = msg.content.slice(pref.length).split(/ +/),
	commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) ||  client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;

	//checking the commands is unusable
	if(command.unusable) {
		return msg.channel.send('Sorry! this command is still in Progress!');
	}
	//checking the commands if its only for guild
	if(command.guildOnly && msg.channel.type !== 'text') {
		return msg.reply('i cant run it inside DMs');
	}
	//checking the commands if its only for NSFW channel
	if(command.nsfw && !msg.channel.nsfw){
		return msg.channel.send({embed:{title:"NSFW Command is Forbidden!", description:"Sorry! We cant send any NSFW Stuff here! Use NSFW commands in a NSFW marked channel (Open channel setting and mark as NSFW)",color:0xed2222,image:{url:'https://i.imgur.com/2uBvP53.gif'}}})
	}
	//checking the commands if its only for Server Administrator
	if(command.adminOnly && !msg.member.hasPermission('ADMINISTRATOR')){
		return msg.channel.send('You cant do this! this is only for Admin of the guild')
	}
	//checking the commands if its only for Owner of the Bot
	if(command.ownerOnly && msg.author.id !== owner){
		return msg.channel.send('**SPECIAL ERROR!** This command is only for Owner of the bot')
	}
	//cooldown of the command
	if(!cooldowns.has(command.name)){
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now(),
	timestamps = cooldowns.get(command.name),
	cooldownAmount = (command.cooldown || 3) * 1000;
	if(timestamps.has(msg.author.id)){
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
		if(now < expirationTime){
			const timeLeft = (expirationTime - now)/ 1000;
			return msg.channel.send({embed:{title:"Slow Down!", color:0xed8922, description:`Slow Down! Please wait for\n**${timeLeft.toFixed(1)} More Seconds!**\nBefore reusing the \`${command.name}\``}})
		}
	}
	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

	//checking the commands if they have arguments in it
	if(command.args && !args.length){
		let reply = `Where is the arguments, ${msg.author}!`;
		if(command.usage){
			reply += `\nThe proper usage would be: \`${pref}${command.name} ${command.usage}\``
		}
		return msg.channel.send(reply);
	}

	//Finnaly Run the command!
	try{ 
		command.execute(msg, args);
	}catch(err){
		console.log(err);
		msg.reply('something went wrong with the command!');
	}
	//API error Catcher
	process.on('unhandledRejection', err =>{
		msg.channel.send({embed:{title:"API Error!", color:0xed8922, description:`Unhandled Promise Rejection :\n\`\`\`${err.name} : ${err.message}\`\`\`\nDetail : \`${err.code}|${err.method}|${err.httpStatus}\``}});
	});
})


client.login(token);
console.log("Finally!");