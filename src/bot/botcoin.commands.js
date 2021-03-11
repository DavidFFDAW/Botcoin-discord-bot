// - Requires
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
    msg.channel.send('caca').then(msg => console.log(msg.content));
}
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
};