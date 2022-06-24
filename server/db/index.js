var mysql = require('mysql2');

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

var dbConnection = mysql.createConnection({
 host: '127.0.0.1',
 user: 'root',
//  password: '',
 database: 'chat'
});

dbConnection.connect((err) => {
  if (err) {
    console.log('error connecting', err)
  } else {
    console.log('connected')
  }
});


module.exports.dbConnection = dbConnection;