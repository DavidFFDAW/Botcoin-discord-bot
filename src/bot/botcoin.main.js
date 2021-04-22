require('dotenv').config();
const Discord = require('discord.js');
const { prefix, botName, serverID } = require('./bot-config.json');
const commands = require('./botcoin.commands.js');
const bot = new Discord.Client();

const channels = { };
const forbiddenWords = ['gilipollas','tonto','subnormal','cabron','cabrón','cabrona','hijoputa','joputa','hijo de puta','puta','putas'];

// const settingInitChannel = _ => channel = bot.guilds.cache.get(serverID).channels.cache.get(channelID);
const gettingCommand = message => {
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;   
    const args = message.content.slice(prefix.length).split(/ +/);
    return args.shift().toLowerCase();
}

bot.once('ready',_ => { // serves as constructor
    console.log('Initiated '+botName+'!');
    //channels.general = bot.channels.cache.find(channel => channel.name === 'general');
    //channels.general.send('No estaba muerto, ¡Estaba de parranda!');
});

bot.on('message', message => {
    const command = gettingCommand(message);
    const lowerMessage = message.content.toLowerCase();
    const isCommand = message.content.toLowerCase().includes(prefix.toLowerCase());

    //? BOT FUNCTIONALITIES AND METHODS

    const notValidCommand = msg => msg.channel.send('Este comando no es valido');

    const checkForbiddenWords = _ => {
        if(forbiddenWords.some(element => lowerMessage.includes(element))){
            message.delete();
            message.channel.send('Este canal no es un canal para que se digan insultos o similares...');
        }
    }

    //? COMMANDS

    const options = { 
        help: commands.help,
        hello: commands.hello,
        showid: commands.myId,
        mycoins: commands.mycoins,
        myname: commands.myname,
        members: commands.catchMembers,
        everycoin: commands.showAllCoins,
        flipcoin: commands.flipCoin,
        mentions: commands.mention,
        totalcoins: commands.totalCoins,
        lose: commands.looseCoins,
        givecoins: commands.giveCoins,
        test: commands.testing,
        shutdown: commands.shutdown,
        default: notValidCommand,
    };

    //? CHECKS IF THE MESSAGE IS A COMMAND AND EXECUTE COMMAND

    if(isCommand){
        try{
            (options[command]) ? options[command]({ msg: message, bot, token: process.env.TOKEN }) : options.default(message);
        } catch(e){
            message.channel.send('ERROR: '+e.message);
        }
        
    }
    else {
        checkForbiddenWords();
    }
});

bot.login(process.env.TOKEN);