const Discord = require('discord.js')
const getRandomNumber = _ => Math.round(Math.random());

const attachments = { 
    face: new Discord.MessageAttachment(__dirname+'/../../../assets/images/coin.face.png','face.png'),
    cross: new Discord.MessageAttachment(__dirname+'/../../../assets/images/coin.cross.png','cross.png')
}
const getAttachment = _ => getRandomNumber() === 0 ? attachments.face : attachments.cross;
const getCoinFile = attach => attach === attachments.face ? 'face.png' : 'cross.png'; 

const embedGenerator = _ => {
    const attach = getAttachment();    
    return new Discord.MessageEmbed()
    .setColor('#eeeeee')
    .setAuthor('Botcoin','http://146.59.159.40/lgo.2.png')
    .attachFiles(attach)
    .setImage('attachment://'+getCoinFile(attach))
    .setTimestamp();
}

module.exports = { embedGenerator };