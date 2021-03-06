
const { prefix, botName } = require('./bot-config.json');

const avaliableCommands = `${prefix}help → muestra este mensaje de informacion.
${prefix}hello: El bot te saluda
${prefix}showId: Muestra el ID de usuario del usuario ejecutante
${prefix}myname: Muestra tanto el nombre de usuario como el nickname del usuario ejecutante
${prefix}mycoins{DEV}: Muestra las monedas disponibles del usuario que ejecuta este comando
${prefix}cache{DEV}: Perimite asignar una cantidad de monedas iniciales a todos y cada uno de los usuarios del servidor actual`;

const getEmbedHelp = discord => {
    return new discord.MessageEmbed()
        .setColor('#22a1f0')
        .setThumbnail('http://146.59.159.40/lgo.2.png')
        .setTitle(botName+' Funcionalidades')
        .setTimestamp()
        .setFooter("Powered and created by David Fernández Flores")
        .addField('Comandos Disponibles: ',avaliableCommands)
};

module.exports = { getEmbedHelp };