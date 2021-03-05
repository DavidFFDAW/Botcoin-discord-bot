const Discord = require('discord.js');
const { prefix, token, botName, serverID } = require('./bot-config.json');
const { CoinServiceWrapper } = require('./coin.json.service.js');
const coinsService = new CoinServiceWrapper(__dirname + '/database.json');
const bot = new Discord.Client();

const initialCoins = 100;

let server;
const forbiddenWords = ['gilipollas','tonto','subnormal','cabron','cabrón','cabrona','hijoputa','joputa','hijo de puta','puta','putas'];

//const settingInitChannel = _ => channel = bot.guilds.cache.get(serverID).channels.cache.get(channelID);
const gettingCommand = message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;   
    const args = message.content.slice(prefix.length).split(/ +/);
    return args.shift().toLowerCase();
}

bot.once('ready',_ => { // makes the times as constructor
    server = bot.guilds.cache.get(serverID);
    console.log('Initiated '+botName+'!');
});

bot.on('message', message => {
    const command = gettingCommand(message);
    const lowerMessage = message.content.toLowerCase();

    //? BOT FUNCTIONALITIES AND METHODS

    const isCommand = message.content.toLowerCase().includes(prefix);
    const sayHello = _ => message.channel.send('Hola Mundo');
    const showID = _ => {
        const authorID = message.member.id;
        message.channel.send('Message author id: '+ authorID);
        message.channel.send(`Type of parsed message author: ${typeof +authorID}`);
    }
    const showCoins = _ => {
        const memberID = message.member.id;
        message.channel.send(`Tus coins son: ${ coinsService.getStringifiedLists(memberID) }`);
    }
    const showName = _ => {
        message.channel.send(`MemberName: ${ message.member.user.username }`);
        message.channel.send(`MemberName: ${ message.author.username }`);
    }
    const checkForbiddenWords = _ => {
        if(forbiddenWords.some(element => lowerMessage.includes(element))){
            message.delete();
            message.channel.send('Este canal no es un canal para que se digan insultos o similares...');
        }
    }

    //? COMMANDS

    const options = { 
        hello: sayHello,
        showId: showID,
        mycoins: showCoins,
        myname: showName,
    };

    //? CHECKS IF THE MESSAGE IS A COMMAND AND EXECUTE COMMAND

    if(isCommand){
        options[command]();
    }
    else {
        checkForbiddenWords();
    }

    if(command === 'ids'){
        message.channel.send('Los usuarios se estan recogiendo...').then(_ => message.channel.send('Esto puede tomar algun tiempo'));
        // coinsService.clearUserList();
        server.members.fetch()
            .then(members => members.forEach(member => {
                const memberID = member.user.id;
                message.channel.send(member.user.name+':  '+memberID);
                console.log(memberID);
                // coinsService.addUser(memberID,initialCoins);
            }))
            .then(_ => message.channel.send('Se han añadido todas las monedas a todos los usuarios actuales'))
            .catch(err => message.channel.send(err.message));
    }
})

bot.login(token);