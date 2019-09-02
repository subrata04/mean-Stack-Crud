const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/crudDb';

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('MongoDb connected successfully......');
  } else {
    console.log('Error establishing connection:' + JSON.stringify(err, undefined, 2));
  }
})

module.exports = mongoose;


