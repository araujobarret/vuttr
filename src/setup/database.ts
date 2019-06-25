import mongoose = require('mongoose');

let options: mongoose.ConnectionOptions = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
};

export default function(dbURI: string, NODE_ENV: string): void {
  console.info(`INFO - connecting to the database [${NODE_ENV}]`);

  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  let connection = mongoose.connection;
  mongoose.connect(dbURI, options);
  connection.on('error', console.error.bind(console, 'conection error:'));
}
