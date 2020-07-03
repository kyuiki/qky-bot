exports.run = async (client, member, channelID) => {
     const channel = member.guild.channels.cache.get(channelID);
     if (!channel) return console.log('err not found channel named bot-channel');
     var roleID = member.guild.roles.cache.find(r => r.name.toLowerCase().includes("torture")).id;
     channel.send(`${member} A.K.A ${member.displayName} Keluar Dari server.\nTerima Kasih sudah bergabung. Kami harap kamu bisa bergabung kembali disini!`);
     if(member.roles.cache.has(roleID)){ member.ban("Member Mempunyai torture role dan otomatis di ban")}
}