const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let url = "mongodb://localhost:27017/intro-to-mongodb";

const connect = (url) =>
  mongoose.connect(url);
mongoose.connection
  .once('open', () => { 
    console.log('CONNECTED') })
  .on('error', (error) => {
    console.warn('Warning', error);
  })

module.exports = connect()
