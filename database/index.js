const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yumme', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

module.exports = db;