const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`App did not connect: ${err.message}`);
});

// import models
require('./models/Recipe');
require('./models/User');

// Start up the app!
const app = require('./app');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`The app is up and running on ${server.address().port}`);
});