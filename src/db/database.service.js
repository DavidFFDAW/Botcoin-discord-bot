const fileSystem = require('fs');

class DatabaseService {
    constructor(filename){
        this.filename = filename;
    }
    _getDbEntries = _ => JSON.parse(fileSystem.readFileSync(this.filename,'utf8'));
    _insertInto = json => fileSystem.writeFileSync(this.filename, JSON.stringify(json,undefined,2));

    // ? - CREATE
    addUserCoins = (userID,userName,coins) => this._insertInto([...this._getDbEntries(), { id: userID, username: userName, coins: coins }]);


    // ? - READ
    selectAll = _ => this._getDbEntries().reduce((acc,curr) => {
        acc += curr.id+': '+curr.coins+'\n';
        return acc;
    },'');

    selectCoinsByID = (userID) => this._getDbEntries().find(users => users.id === userID).coins;
    selectCoinsByUsername = (userName) => this._getDbEntries().find(users => users.username === userName).coins;
   
    
    // ? - UPDATE
    updateCoinsByID = (userID, newCoins) => {
        const users = this._getDbEntries();
        users.find(users => users.id === userID).coins = newCoins;
        this._insertInto(users);
    }
    updateTotalCoins = _ => {
        const users = this._getDbEntries();
        const total = users.filter(user => user.username !== 'Botcoin')
                           .reduce((acc, user) => acc + user.coins,0);
        users.find(users => users.username === 'Botcoin').coins = total;
        this._insertInto(users);
    }


    // ? - DELETE
    clearDatabase = _ => this._insertInto([]);
    deleteUserbyID = userID => {
        let users = this._getDbEntries();
        users = users.filter(({ id }) => id !== userID);
        this._insertInto(users);
    }
}
module.exports = { UserDbWrapper: DatabaseService };