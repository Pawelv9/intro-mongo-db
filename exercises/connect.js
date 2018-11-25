const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const connect = url =>
  mongoose.connect(url,
    {useNewUrlParser: true});

// mongoose.connection
//   .once('open', () => { 
//     console.log('CONNECTED') })
//   .on('error', (error) => {
//     console.warn('Warning', error);
//   })

module.exports = connect()
