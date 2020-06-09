const Discord = require('discord.js'),
uuidv4 = require("uuid/v4");

module.exports = {
	name: 'createmanifest',
	description: 'Create the manifest for minecraft',
	aliases: ['manifest', 'crtmnfst'],
	args: false,
	usage: '',
	cooldown: 5,
	nsfw: false,
	guildOnly: true,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		msg.channel.send(
			{embed:{
				title: "Create Minecraft Manifest", 
				description: "Please type the name of the pack",
				color: 0x5333df
			}})
		.then((message) => {
			const filter = m => msg.author.id === m.author.id;
			msg.channel.awaitMessages(filter, {time: 60000, max: 1, errors: ['time']})
			.then(msginput => {
				const name = msginput.first().content,
				editedEmbed = new Discord.MessageEmbed(message.embeds[0]).setDescription("Please type the description of the pack").addField('Pack Name', name )
				message.edit(editedEmbed)
				.then(() => {
					msg.channel.awaitMessages(filter, {time: 60000, max: 1, errors: ['time']})
					.then(msginput => {
						const description = msginput.first().content,
						editedEmbed = new Discord.MessageEmbed(message.embeds[0]).setDescription("Please put the type of this manifest").addField('Description', description )
						message.edit(editedEmbed)
						.then(() => {
							msg.channel.awaitMessages(filter, {time: 60000, max: 1, errors: ['time']})
							.then(msginput => {
								const type = msginput.first().content,
								editedEmbed = new Discord.MessageEmbed(message.embeds[0]).setDescription("Thank you for using our service :) \n:page_with_curl: **We send you a script in here**").addField('Pack Type', type ).setColor('#43df23')
								message.edit(editedEmbed)
								msg.channel.send(`{\n "format_version" : 1,\n "header" : {\n  "description" : "${description}",\n  "name" : "${name}",\n  "uuid" : "${uuidv4()}",\n  "version" : [ 0, 0, 1 ]\n },\n "modules" : [{\n  "description" : "${description}",\n  "type" : "${type}",\n  "uuid" : "${uuidv4()}",\n  "version" : [ 0, 0, 1 ]\n }]\n}`, {code : 'json'})
							}).catch(() => {
								msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!")
							})
						})
					}).catch(() => {
						msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!")
					})
				})
			}).catch(() => {
				msg.channel.send("Hmmm. You didnt enter any input. ok Canceled!")
			})
		})
	}
};
