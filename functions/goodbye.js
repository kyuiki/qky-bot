exports.run = async (client, member, channelID) => {
     const channel = member.guild.channels.cache.get(channelID);
     channel.send(`${member} A.K.A ${member.displayName} Keluar Dari server.\nTerima Kasih sudah bergabung. Kami harap kamu bisa bergabung kembali disini!`)
}