const Discord = require('discord.js');
const { prefix, token, botName, serverID } = require('./bot-config.json');
const { UserDbWrapper } = require('../db/database.service.js');
const { getEmbedHelp } = require('./commands/command.help.js');
const { embedGenerator } = require('../games/flipacoin/game.flip.coin.js');

const usersService = new UserDbWrapper(__dirname + '/../db/users.database.json');
const bot = new Discord.Client();

//const channels = { };
const initialCoins = 100;
const forbiddenWords = ['gilipollas','tonto','subnormal','cabron','cabrón','cabrona','hijoputa','joputa','hijo de puta','puta','putas'];

//const settingInitChannel = _ => channel = bot.guilds.cache.get(serverID).channels.cache.get(channelID);
const gettingCommand = message => {
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;   
    const args = message.content.slice(prefix.length).split(/ +/);
    return args.shift().toLowerCase();
}

bot.once('ready',_ => { // makes the times as constructor
    console.log('Initiated '+botName+'!');
    //channels.general = bot.channels.cache.find(channel => channel.name === 'general');
    //channels.general.send('Tu bot de confianza ha llegado');
});

bot.on('message', message => {
    const command = gettingCommand(message);
    const lowerMessage = message.content.toLowerCase();

    //? BOT FUNCTIONALITIES AND METHODS

    const isCommand = message.content.toLowerCase().includes(prefix.toLowerCase());

    const sayHello = _ => message.channel.send('Hola Mundo');
    const getHelp = _ => message.channel.send(getEmbedHelp(Discord));

    const showID = _ => {
        const authorID = message.member.id;
        message.channel.send('Message author id: '+ authorID);
        message.channel.send(`Type of parsed message author: ${typeof +authorID}`);
    }
    const showCoins = _ => {
        const memberID = message.member.id;
        message.channel.send(`Tus coins son: ${ usersService.selectCoinsByID(memberID) }`);
    }
    const showName = _ => {
        message.channel.send(`MemberName: ${ message.member.user.username }`);
        message.channel.send(`MemberName: ${ message.author.username }`);
    }

    const showMembers = _ => {
        message.channel.send('Los usuarios se estan recogiendo...');
        
        usersService.clearDatabase();
        
        message.guild.members.fetch()
        .then(members => {
            members.forEach(member => /*!member.user.bot ? */usersService.addUserCoins(member.user.id, member.user.username,initialCoins));/* : '')*/
            usersService.updateTotalCoins();
        })
        .then(_ => message.channel.send('Los usuarios se han almacenado correctamente'))
        .catch(err => message.channel.send(err.message));
    }

    const looseCoins = () => {
        const userID = message.member.id;
        const coins = +message.content.split(' ')[2];
        const oldCoins = usersService.selectCoinsByID(userID);
        usersService.updateCoinsByID(userID, oldCoins - coins);
        usersService.updateTotalCoins();
        message.channel.send(`<@${ message.author.id }> Has perdido ${ coins } coins`);
    }

    const showAllCoins = _ => message.channel.send(`${ usersService.selectAll() }`);

    const flipCoinResult = _ => message.channel.send(embedGenerator());

    const mention = _ => {
        if(!message.content.includes('@')){
            throw new Error('Este comando no funciona asi');
        }
        const splitted = message.content.split(' ');
        console.log('-----------------');
        console.log('Spliteado: ',splitted);
        const mentionID = splitted[2].replace(/[<@!>]/g,'');
        console.log('MentionID: ',mentionID);
        const mentionName = message.guild.members.cache.find(el => el.id === mentionID).user.username;
        console.log('MentionName: ',mentionName);
        const userID = message.member.user.id;
        const userName = message.member.user.username;
        message.channel.send(`UserName: ${userName},  UserID: ${userID}`);
        message.channel.send(`MentionName: ${mentionName},  MentionID: ${mentionID}`);
    }

    const showTotalCoins = _ => message.channel.send('Las coins del bot y totales comunes son: '+usersService.selectCoinsByID(bot.user.id));

    const notValidCommand = _ => message.channel.send('Este comando no es valido');

    const checkForbiddenWords = _ => {
        if(forbiddenWords.some(element => lowerMessage.includes(element))){
            message.delete();
            message.channel.send('Este canal no es un canal para que se digan insultos o similares...');
        }
    }

    const test = _ => {
        const msg = message.channel.send('No se que hago');
        msg.then(msg => msg.delete());
    }

    //? COMMANDS

    const options = { 
        help: getHelp,
        hello: sayHello,
        showid: showID,
        mycoins: showCoins,
        myname: showName,
        members: showMembers,
        everycoin: showAllCoins,
        flipcoin: flipCoinResult,
        mentions: mention,
        totalcoins: showTotalCoins,
        lose: looseCoins,
        test: test,
        default: notValidCommand,
    };

    //? CHECKS IF THE MESSAGE IS A COMMAND AND EXECUTE COMMAND

    if(isCommand){
        try{
            (options[command]) ? options[command]() : options.default();
        } catch(e){
            message.channel.send('ERROR: '+e.message);
        }
        
    }
    else {
        checkForbiddenWords();
    }
});

bot.login(token);