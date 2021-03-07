/* const { CoinServiceWrapper } = require('./coin.json.service');
const JSONService = new CoinServiceWrapper('./database.json');

const usersIDs = [1,2,3,4,5,6,7,8];
const initialCoins = 100;

console.log(JSONService._getJSONObject());
JSONService.clearUserList();
usersIDs.forEach(el => JSONService.addUser(el,initialCoins)); */

const thingy = '<@!817116097701871726>';

console.log('Original:  ',thingy);

const replaced = thingy.replace(/[<@!>]/g,'');

console.log('Replaced: ',replaced);