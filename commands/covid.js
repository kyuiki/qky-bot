const {NovelCovid} = require("novelcovid"), covid = new NovelCovid();

module.exports = {
	name: 'covid',
	description: 'Show covid-19 Statistic',
	aliases: ['covs', 'corona'],
	args: true,
	usage: 'CountryName',
	cooldown: 3,
	nsfw: false,
	guildOnly: false,
	needPerms: {
		bool: false,
		permission : []
	},
	ownerOnly: false,
	execute(client, msg, args){
		if((args[0]||args[1]).toLowerCase() == "leaderboards"){
			covid.countries().then(res => {
				let leaderdata = [], i = 10, rank = ":small_blue_diamond:";
				while(i){
					i--;
					switch(i){
						case 0:rank = ":first_place:";break;
						case 1:rank = ":second_place:";break;
						case 2:rank = ":third_place:";break;
						case 3:rank = ":small_orange_diamond:";break;
					}
					leaderdata.push(
							{
								name: `${rank} :flag_${res[i].countryInfo.iso2.toLowerCase()}: ${res[i].country}`,
								value: `**Cases** :\n${res[i].cases} Cases\n**Today Cases** :\n${res[i].todayCases} Cases\n**Recovered** :\n${res[i].recovered} recovered\n**Deaths** :\n${res[i].deaths} deaths\n**Cases / 1 Million** :\n${res[i].casesPerOneMillion} cases\n**Deaths / 1 Million** :\n${res[i].deathsPerOneMillion} deaths\n\u200b`,
								inline: false,
							});
				}
				
				let embed = {
						title:"Top 10 CoronaVirus Leaderboards",
						author:{
							name:"COVID-19 Info Command", 
							icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
						},
						description: ``,
						fields: leaderdata.reverse(),
						color: 0x2365f1,
						timestamp: new Date(),
						footer:{
							text: "Big Thanks to https://corona.lmao.ninja"
						}
				}
				msg.channel.send({embed:embed})

			})
		}else if((args[0]||args[1]).toLowerCase() == "all"){
			covid.all().then(res => {
				let embed = {
						title:"CoronaVirus Informations Statistic",
						author:{
							name:"COVID-19 Info Command", 
							icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
						},
						description: ``,
						fields: [
							{
								name: ':earth_asia: :bar_chart: World wide COVID-19 Statistics',
								value: `> **Cases** :\n> ${res.cases} Cases\n> **Today Cases** :\n> ${res.todayCases} Cases\n> **Recovered** :\n> ${res.recovered} recovered\n> **Deaths** :\n> ${res.deaths} deaths\n> **Today Deaths** :\n> ${res.todayDeaths} deaths\n> **Active** :\n> ${res.active} actives\n> **Critical** :\n> ${res.critical} criticals\n> **Cases / 1 Million** :\n> ${res.casesPerOneMillion} cases\n> **Deaths / 1 Million** :\n> ${res.deathsPerOneMillion} deaths\n> **Affected Countries**\n> ${res.affectedCountries} Countries`,
								inline: false,
							}
						],
						color: 0x2365f1,
						timestamp: new Date(res.updated),
						footer:{
							text: "Updated at "
						}
				}
				msg.channel.send({embed:embed})

			})
		}else{
			covid.countries((args[0]||args[1])).then(res =>{
				if(res.message) return msg.channel.send({embed:{
					title:"Country Not Found",
					author:{
						name:"COVID-19 Info Command Error", 
						icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
					},
					description: "Please put the proper Country name **WITHOUT** Space or any Special Character!\n> :mag: You was searching for : __"+(args[0]||args[1])+"__",
					color: 0xff2121
				}});
				let embed = {
						title:"CoronaVirus Informations Statistic",
						author:{
							name:"COVID-19 Info Command", 
							icon_url:"https://r7.pngguru.com/path/242/820/983/question-mark-icon-question-mark-png-527c9efd741ebe7856dde44d2506af66.png"
						},
						description: ``,
						fields: [
							{
								name: ':bar_chart: COVID-19 Statistics',
								value: `> **Country** : \n> :flag_${res.countryInfo.iso2.toLowerCase()}: ${res.country}\n> **Cases** :\n> ${res.cases} Cases\n> **Today Cases** :\n> ${res.todayCases} Cases\n> **Recovered** :\n> ${res.recovered} recovered\n> **Deaths** :\n> ${res.deaths} deaths\n> **Today Deaths** :\n> ${res.todayDeaths} deaths\n> **Active** :\n> ${res.active} actives\n> **Critical** :\n> ${res.critical} criticals\n> **Cases / 1 Million** :\n> ${res.casesPerOneMillion} cases\n> **Deaths / 1 Million** :\n> ${res.deathsPerOneMillion} deaths`,
								inline: false,
							}
						],
						color: 0x2365f1,
						timestamp: new Date(res.updated),
						footer:{
							text: "Updated at "
						}
				}
				msg.channel.send({embed:embed})
			})
		}
	}
};
