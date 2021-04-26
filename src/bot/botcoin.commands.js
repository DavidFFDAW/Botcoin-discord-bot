// - Requires
const Discord = require('discord.js');
const { UserDbWrapper } = require('../db/database.service.js');
const { getEmbedHelp } = require('./commands/command.help.js');
const { embedGenerator } = require('../games/flipacoin/game.flip.coin.js');
const usersService = new UserDbWrapper(__dirname + '/../db/users.database.json');
//-

const initialCoins = 100;

const getUserNumberID = id => {
    return id.replace(/[<!@>]/g,'');
}
const sayHello = msg => msg.channel.send('Hola Mundo');
const getHelp = msg => msg.channel.send(getEmbedHelp(Discord));

const showID = msg => {
    const authorID = msg.member.id;
    msg.channel.send('Message author id: '+ authorID);
    msg.channel.send(`Type of parsed message author: ${typeof +authorID}`);
}
const showCoins = msg => {
    const memberID = msg.member.id;
    msg.channel.send(`Tus coins son: ${ usersService.selectCoinsByID(memberID) }`);
}
const showName = msg => {
    msg.channel.send(`MemberName: ${ msg.member.user.username }`);
    msg.channel.send(`MemberName: ${ msg.author.username }`);
}
const showMembers = msg => {
    msg.channel.send('Los usuarios se estan recogiendo...');
    
    usersService.clearDatabase();
    
    msg.guild.members.fetch()
    .then(members => {
        members.forEach(member => /*!member.user.bot ? */usersService.addUserCoins(member.user.id, member.user.username,initialCoins));/* : '')*/
        usersService.updateTotalCoins();
    })
    .then(_ => msg.channel.send('Los usuarios se han almacenado correctamente'))
    .catch(err => msg.channel.send(err.message));
}

const looseCoins = (msg) => {
    const userID = msg.member.id;
    const coins = +msg.content.split(' ')[2];
    const oldCoins = usersService.selectCoinsByID(userID);
    usersService.updateCoinsByID(userID, oldCoins - coins);
    usersService.updateTotalCoins();
    msg.channel.send(`<@${ msg.author.id }> Has perdido ${ coins } coins`);
}

const showAllCoins = msg => msg.channel.send(`${ usersService.selectAll() }`);

const flipCoinResult = msg => msg.channel.send(embedGenerator());

const mention = msg => {
    if(!msg.content.includes('@')){
        throw new Error('Este comando no funciona asi');
    }
    const splitted = msg.content.split(' ');
    console.log('-----------------');
    console.log('Spliteado: ',splitted);
    const mentionID = splitted[2].replace(/[<@!>]/g,'');
    console.log('MentionID: ',mentionID);
    const mentionName = msg.guild.members.cache.find(el => el.id === mentionID).user.username;
    console.log('MentionName: ',mentionName);
    const userID = msg.member.user.id;
    const userName = msg.member.user.username;
    msg.channel.send(`UserName: ${userName},  UserID: ${userID}`);
    msg.channel.send(`MentionName: ${mentionName},  MentionID: ${mentionID}`);
}

const showTotalCoins = msg => {
    const bot = msg.guild.members.cache.find(member => member.user.username === 'Botcoin');
    msg.channel.send('Las coins del bot y totales comunes son: '+usersService.selectCoinsByID(bot.user.id));
};

const giveCoins = msg => {
    // ? -   bc  givecoins   10   @Pedeo
    // ? -   ↑      ↑        ↑      ↑
    // ? -   0      1        2      3
    const userID = msg.member.id;
    const split = msg.content.split(' ');
    const mentionedID = getUserNumberID(split[3]);
    const coins = +split[2];
    console.log('Introduced coins: ',coins);
    console.log('MentionedID: ',mentionedID);
    const userCoins = +usersService.selectCoinsByID(userID);
    console.log('UserCoins: ',userCoins);
    usersService.updateCoinsByID(userID,userCoins - coins);
    const mentionedCoins = +usersService.selectCoinsByID(mentionedID);
    console.log('MentionedCoins: ',mentionedCoins);
    usersService.updateCoinsByID(mentionedID, mentionedCoins + coins);
    usersService.updateTotalCoins();
}

const test = msg => {
    const message = msg.channel.send('Ultimo test realizado el 25/04/2021');
    message.then(message => message.react('https://discord.com/assets/522c8314225487737f7dd4ead8d4a731.svg'));
}

const birthday = async (msg) => {
    const embedMessage = new Discord.MessageEmbed()
    .setColor('#22a1f0')
    .setImage('https://media.istockphoto.com/photos/happy-birthday-made-of-balloon-letters-on-white-background-picture-id1141494010?k=6&m=1141494010&s=612x612&w=0&h=OOzSz4sXqQtwMGW82SplJcg3Ek4Qqy2nCupBlwvuF_s=')
    .setAuthor('¡¡ Felisidadeee !!','https://jetstax.com/assets/img/games/discord.png')
    .setTitle('Felis cumpleaños PEDEOO')
    .setFooter("Powered and created by David Fernández Flores")
    .setTimestamp();

    await msg.channel.send('Vaya vaya...');
    await msg.channel.send('Parece que es el cumpleaños de alguien o eso me han dicho');
    await msg.channel.send('Bueno po eso: Felisidade');
    await msg.channel.send(embedMessage);
}
/*
const shutdown = ({msg,bot}) => {
    msg.reply('This will cause the bot to shut down...\n Are you sure?\n "yes" or "no"');
    msg.channel.awaitMessages(message => message.author.id === msg.author.id,
        { max: 1, time: 10000 }).then(collected => {
        if(collected.first().content.toLowerCase() === 'yes'){
            msg.reply('Shutting bot down... This may take a few minutes').then(() => bot.destroy());
        }
        else{
            msg.reply('Action cancelled');
        }
    })
    .catch(_ => {
        msg.reply('Error: No response provided');
    });
}
*/
 // - Exports
module.exports = {
    hello: sayHello,
    help: getHelp,
    myId: showID,
    mycoins: showCoins,
    myname: showName,
    catchMembers: showMembers,
    looseCoins: looseCoins,
    flipCoin: flipCoinResult,
    showAllCoins: showAllCoins,
    testing: test,
    mention: mention,
    totalCoins: showTotalCoins,
    giveCoins: giveCoins,
    birthdate: birthday,
};