
module.exports = {
	name: 'info',
	description: 'bot information',
	aliases: ['inf', 'version'],
	args: false,
	usage: '',
	cooldown: 3,
	nsfw: false,
	guildOnly: false,
	adminOnly: false,
	ownerOnly: false,
	execute(client, msg, args){
		let embed = {
				title:"Bot Informations and Versions",
				author:{
					name:"Info Command", 
					icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
				},
				description: ``,
				fields: [
					{
						name: ':information_source: Informations',
						value: "Script by Qky\nMade with Discord.js V12",
						inline: false,
					}
				],
				color: 0x2365f1
		}
		msg.channel.send({embed:embed})
	}
};
