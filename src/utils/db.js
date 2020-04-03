const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connection = mongoose.connect('mongodb://localhost:27017/remoteparty', {
  autoIndex: true,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

connection
  .then(db => db)
  .catch(err => {
    console.log(err);
  });

module.exports = connection;
