class ListConfigurationsService {
    constructor(filename){
        this.fileName = filename;
        this.fs = require('fs');
        this.createIfNotExists();
    }

    writeJSON = json => this.fs.writeFileSync(this.fileName, JSON.stringify(json,undefined,2));
    
    createIfNotExists = () => {
        if(!this.fs.existsSync(this.fileName)){
            this.writeJSON([
                { id: 1, lists: [{ name: 'frutas', content: ['Platano','Pera'] }] },
                { id: 2, lists: [{ name: 'coches', content: ['Mercedes','Citroen','Opel'] }] }
            ]);
        }
    }

    _getJSONObject = _ => {
        const jsonGotten = this.fs.readFileSync(this.fileName,'utf8');
        return JSON.parse(jsonGotten);
    }
    /* getUserByID = (userID) => {
        if (this._alreadyExistsUser(userID)){
            this._getJSONObject().find(el => el.id === userID);
        } else {
            this.createUser(userID);
        }
    } */
    createUser = (userID,listname,list) => {
        const obj = this._getJSONObject();
        this.writeJSON(finalUsers);
    }
    clearList = (userID, oldName = undefined) => {
        const obj = this._getJSONObject();
        const user = obj.find(el => el.id === userID);
    
        if(oldName){
            const foundList = user.lists.find(el => el.name === oldName);
            foundList.content = [];
        } else {
            user.lists = [];
        }
        this.writeJSON(obj);
    }
    findListByNameAndUserID = (userId,listname) => {
        const obj = this._getJSONObject();
        const findUser = obj.find(el => el.id === userId);
        const list = findUser.lists.find(el => el.name === listname);
        return list.content;
    }
    addNewList = (userId,listname,list) => {
        let obj = this._getJSONObject();
        if (this._alreadyExistsUser(userId)) {
            const findUser = obj.find(el => el.id === userId);
            const newList = [...findUser.lists, { name: listname, content: list }];
            findUser.lists = newList;
        } else {
            const newUser = { id: userId, lists: [{ name: listname, content: list }] };
            obj = [...obj,newUser];
        }
        this.writeJSON(obj);
    }
    updateListContent = (id,listname,listcontent) => {
        let obj = this._getJSONObject();
        const foundUser = obj.find(el => el.id === id);
        const foundList = foundUser.lists.find(el => el.name === listname);
        foundList.content = listcontent;
        this.writeJSON(obj);
    }
    updateListName = (id,listname,newname) => {
        let obj = this._getJSONObject();
        const foundUser = obj.find(el => el.id === id);
        const foundList = foundUser.lists.find(el => el.name === listname);
        foundList.name = newname;
        this.writeJSON(obj);
    }
    deleteListByName = (userID, name) => {
        const obj = this._getJSONObject();
        const foundUser = obj.find(el => el.id === userID);
        foundUser.lists = foundUser.lists.filter(el => el.name !== name);
        this.writeJSON(obj);
    }
    _alreadyExistsUser = userID => this._getJSONObject().filter(element => element.id === userID).length > 0;
    
    getStringifiedLists = (userID) => {
        const obj = this._getJSONObject();
        const foundUser = obj.find(el => el.id === userID);
        return foundUser.lists.reduce((acc,element) => acc += 'listName: \''+element.name+'\' || lista: '+element.content.toString()+'\n','');
    }
}/* 

const configsService = new ListConfigurationsService('./configs.json');/* 
console.log(configsService.findListByNameAndUserID(1,'Operative-Systems'));
console.log(configsService.updateListName(1,'Operative-Systems','OS'));
console.log(configsService.getStringifiedLists(2));
console.log(configsService.updateListContent(1,'OS',['Windows', 'Linux', 'MacOS','FreeBSD']));
console.log(configsService.addNewList(1,'cars',['tesla','mercedes','citroen']));

// ALL THOSE WORKS !!


const fruitsArray = ['apple','banana','pear'];
configsService.addNewList(3,'fruits',fruitsArray);

console.log('-------------------------+-------------------------------');
console.log(configsService.getStringifiedLists(1));
console.log(configsService.getStringifiedLists(2));
//console.log('|  ',configsService.getStringifiedLists(3));
console.log('-------------------------+-------------------------------'); */