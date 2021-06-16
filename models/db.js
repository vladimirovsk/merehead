const mongoDB = 'mongodb://127.0.0.1:27017/merehead';
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = connection;
