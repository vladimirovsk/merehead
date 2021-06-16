const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Users = new Schema({
    name : {type: String},
    surname: {type:String},
    description: {type:String},
    avatar: { data: Buffer, contentType: String }
});

let users = mongoose.model('Users', Users);

module.exports = users;


