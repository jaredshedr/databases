var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.dbConnection.query('SELECT * FROM username', (err, result) => {
      if (err) {
        console.log('error receiving all usernames', err);
      } else {
        callback(null, result);
      }
    })
  },
  create: function (user, callback) {
    db.dbConnection.query(`INSERT IGNORE INTO username(username) VALUES(?)`, [user.username], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    })
  }
};
