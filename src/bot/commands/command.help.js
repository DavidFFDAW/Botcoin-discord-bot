
const { prefix, botName } = require('../bot-config.json');

const avaliableCommands = `\`${prefix}help\` → muestra este mensaje de informacion.
\`${prefix}hello\` → El bot te saluda
\`${prefix}showid\` → Muestra el ID de usuario del usuario ejecutante
\`${prefix}myname\` → Muestra tanto el nombre de usuario como el nickname del usuario ejecutante
\`${prefix}mentions [@user]\` → Muestra el ID y el username del ejecutante y del mencionado
\`${prefix}mycoins{DEV}\` → Muestra las monedas disponibles del usuario que ejecuta este comando
\`${prefix}members{DEV}\` → Permite asignar una cantidad de monedas iniciales a todos y cada uno de los usuarios del servidor actual
\`${prefix}everycoin{DEV}\` → Obtiene una lista con todos los IDs y coins asignados
\`${prefix}flipcoin{DEV}\` → Mostrará un mensaje con la imagen de una moneda (cara o cruz)
\`${prefix}totalcoins{DEV}\` → Muestra en pantalla los coins totales
\`${prefix}lose [cantidad]{DEV}\` → La cantidad debe ser un numero y te hará perder dicha cantidad de coins`;

const getEmbedHelp = discord => {
    return new discord.MessageEmbed()
        .setColor('#22a1f0')
        .setAuthor('Botcoin Bot','http://146.59.159.40/lgo.2.png')
        .setTitle(botName+' Funcionalidades')
        .setDescription('Pueden no ser las funcionalidades finales del Producto')
        .setTimestamp()
        .setFooter("Powered and created by David Fernández Flores")
        .addField('Comandos Disponibles: ',avaliableCommands)
};

module.exports = { getEmbedHelp };