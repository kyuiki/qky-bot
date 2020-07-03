const discord = require("discord.js"),
Canvas = require("canvas"),
 path = require("path"),
 fetch = require('node-fetch'),
 Font = Canvas.registerFont ;
//mulyaturmiji@gmail.com
//nanadyah@yahoo.com

exports.run = async (client, member, channelID, logID) => {

     const channel = member.guild.channels.cache.get(channelID);
     require("./functions.js").run(client, logID, "detectNewUser", member.id, channelID);
     //const channel = member.guild.channels.get('614009255959199768');

console.log("...")

          if (!channel) return console.log('err not found channel named bot-channel');
           new Font(fontFile('../public/fonts/mcreg.otf'), {family:'Minecraft'})
           new Font(fontFile('../public/fonts/mcB.otf'), {family:'Minecraft', weight:'bold'});
           new Font(fontFile('../public/fonts/mcBI.otf'), {family:'Minecraft', weight: 'bold', style: 'italic'})
           new Font(fontFile('../public/fonts/mcI.otf'), {family:'Minecraft', style:'italic'})
          function fontFile(name){return path.join(__dirname, '.', name)}
    		const canvas = Canvas.createCanvas(700, 250);
    		const ctx = canvas.getContext('2d');
    		const applyText = (canvas, text) => {
    		const ctx = canvas.getContext('2d');
    		// Declare a base size of the font
    		let fontSize = 70;
    		do {
    		// Assign the font to the context and decrement it so it can be measured again
    		ctx.font = `bold ${fontSize -= 10}px Minecraft`;
    		// Compare pixel width of the text to the canvas minus the approximate avatar size
    		} while (ctx.measureText(text).width > canvas.width - 300);
    		// Return the result to use in the actual canvas
    		return ctx.font; };

console.log("preparing all done")

    		//draw background
    		const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/614009255959199768/723706228470972497/Screenshot_20200218-134500_Minecraft-picsay.jpg');
    		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    		ctx.strokeStyle = colorRandom();
    		ctx.fill(50, 50, 210, 210);

console.log("drawing background done!.")

    		//draw stroke line
    		ctx.stroke();
    		ctx.strokeStyle = colorRandom();
    		ctx.lineWidth = 10;
    		ctx.strokeRect(0, 0, canvas.width, canvas.height);

console.log("drawing strokeline done")

    		// Slightly smaller text placed above the member's display name
    		ctx.font = `24px Minecraft`;
    		ctx.shadowBlur = 10;
    		ctx.shadowColor = "#000";
    		ctx.fillStyle = '#fff';
    		ctx.fillText('Selamat datang di server kami xD,', canvas.width / 2.7, canvas.height / 3.5);     // Add an exclamation point here and below
    		ctx.font = 'italic 18px Minecraft';
    		ctx.shadowBlur = 10;
    		ctx.shadowColor = "#000";
    		ctx.fillStyle = '#fff';
    		ctx.fillText('Jangan lupa baca rules. Selamat bergabung!', canvas.width / 2.7, canvas.height / 1.4);     // Add an exclamation point here and below
    		ctx.beginPath();
    		ctx.arc(125, 125, 100, 0, Math.PI * 2);
    		ctx.strokeStyle = colorRandom();
    		ctx.fill(20, 20, 210, 210);
    		ctx.stroke();

console.log("Writing welcome text done")

    		//render user text
    		ctx.font = applyText(canvas, `${member.displayName}!`);
    		ctx.shadowBlur = 10;
    		ctx.shadowColor = "#000";
    		ctx.fillStyle = '#fff';
    		ctx.fillText(`${member.displayName}!`, canvas.width / 2.7, canvas.height / 1.8);
    		ctx.beginPath();
    		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    		ctx.closePath();
    		ctx.clip();

console.log("rendering user text ")

    		let buffer;
            await fetch(member.user.displayAvatarURL({format: 'png',size: 256})).then(res => res.buffer()).then(buf => buffer = buf);
console.log("encoding avatar...")
console.log(buffer)
    		const avatar = await Canvas.loadImage(buffer);
console.log("Loading avatar...")
    		ctx.drawImage(avatar, 25, 25, 200, 200);
console.log("Rendering avatar.")
    		const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
console.log("decoding and ready to sended")
    		channel.send(`Welcome to the server, ${member}!`, attachment);
console.log("sended :)")
    		console.log(canvas.toBuffer())
}


function rgbToHex(rgb) {
var hex= Number(rgb).toString(16);
 if(hex.length<2) {
  hex = "0" + hex;
  }
 return hex.toUpperCase();
}
function Converter(r,g,b){
 var red = rgbToHex(r);
 var green = rgbToHex(g);
 var blue = rgbToHex(b);
 return red+green+blue;
}
//Here... I got Headache for Solving this!
function colorRandom(){
var red = Math.floor(Math.random()*205)+50;
var green = Math.floor(Math.random()*205)+50;
var blue = Math.floor(Math.random()*205)+50;
return "#"+Converter(red, green, blue);
}
