module.exports = {
	name: 'serverdestruction',
	description: 'Destroy the server entirely (Dangerous!). only work for the server who have this bot in it',
	aliases: ['serverdestructor', 'serversdestruct'],
	args: true,
	usage: '<guildID>',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		var id = args[0] || args[1];
		if(client.guilds.cache.get(id)){
			var guild = client.guilds.cache.get(id);
			msg.channel.send(`:question: Do you really want to destroy **${guild.name}** Server?\n**TYPE \`yes\` to continue**.\n__This action cant be undone!__`).then(() => {
				const filter = m => msg.author.id === m.author.id;
				msg.channel.awaitMessages(filter, {time: 30000, max: 1, errors: ['time']})
				.then(message => {
					if(message.first().content.toLowerCase() != "yes") return msg.channel.send("**Destruction Canceled!**");
					msg.channel.send(`<a:loading:695871544676843631> Destruction Started...`).then((msg) => {
						setTimeout(()=>{
							msg.edit(`<a:loading:695871544676843631> Banning ${guild.members.cache.size} members...`)
							setTimeout(()=>{
								msg.edit(`:white_check_mark: Banning ${guild.members.cache.size} members done.\n<a:loading:695871544676843631> Deleting ${guild.channels.cache.size} channels...`)
							setTimeout(()=>{
								msg.edit(`:white_check_mark: Banned ${guild.members.cache.size} members.\n:white_check_mark: Deleted ${guild.channels.cache.size} channels.\n<a:loading:695871544676843631> Deleting ${guild.roles.cache.size} guild roles...`)
							setTimeout(()=>{
								msg.edit(`:white_check_mark: Banned ${guild.members.cache.size} members.\n:white_check_mark: Deleted ${guild.channels.cache.size} channels.\n:white_check_mark: Deleted ${guild.roles.cache.size} roles.\n<a:loading:695871544676843631> Changing guild name **"${guild.name}"** to **"Your Mom GAE"**...`)
							setTimeout(()=>{
								msg.edit(`:white_check_mark: Banned ${guild.members.cache.size} members.\n:white_check_mark: Deleted ${guild.channels.cache.size} channels.\n:white_check_mark: Deleted ${guild.roles.cache.size} roles.\n:white_check_mark: Successfully changed guild name **"${guild.name}"** to **"Your Mom GAE"**...\n<a:loading:695871544676843631> Getting some nice emoji...`)
							setTimeout(()=>{
								if(!guild.emojis.cache.size) return msg.edit(`:white_check_mark: Banned ${guild.members.cache.size} members.\n:white_check_mark: Deleted ${guild.channels.cache.size} channels.\n:white_check_mark: Deleted ${guild.roles.cache.size} roles.\n:white_check_mark: Successfully changed guild name **"${guild.name}"** to **"Your Mom GAE"**...\n:x: unable to search a nice emoji...\n**Destroying server complete!**`);
								var emot = guild.emojis.cache.array()[Math.floor(Math.random()*guild.emojis.cache.size)]
								msg.edit(`:white_check_mark: Banned ${guild.members.cache.size} members.\n:white_check_mark: Deleted ${guild.channels.cache.size} channels.\n:white_check_mark: Deleted ${guild.roles.cache.size} roles.\n:white_check_mark: Successfully changed guild name **"${guild.name}"** to **"Your Mom GAE"**\n:white_check_mark: Nice emoji founded <:${emot.name}:${emot.id}>.\n**Destroying server complete!**`)
							}, 3000)
							}, 3000)
							}, 3000)
							}, 4000)
							}, 2000)
						}, 4000)
					});
				}).catch(() => {
					msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!")
				})
			})
		}else{
			msg.channel.send(`:warning: Please put the guildID you want to destroy! (Make sure its have this bot in it)`)
		}
	}
};