var db = require('../db');


//console.log(db.dbConnection);

module.exports = {
  getAll: function (callback) {
    db.dbConnection.query('SELECT * FROM messages', (err, result) => {
      if (err) {
        console.log('error receiving all messages', err);
      } else {
        callback(null, result);
      }
    })
  }, // a function which produces all the messages
  create: function (message, callback) {
    console.log(message);
    db.dbConnection.query(`INSERT IGNORE INTO roomname(roomname) VALUES(?)`, [message.roomname], (err) => {
      if (err) {
        throw err;
      }
    })


    db.dbConnection.query(`INSERT INTO messages (message, roomname_id, username_id) values(?, (SELECT roomname_id FROM roomname WHERE roomname = ?), (SELECT username_id FROM username WHERE username = ?))`, [message.message, message.roomname, message.username],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });

  } // a function which can be used to insert a message into the database
};
//INSERT IGNORE INTO roomname(roomname) VALUES(message.roomname)
//INSERT INTO messages (message, username_id, roomname_id) values('messagestring' (SELECT roomname_id FROM roomname Where roomname === ${messages.roomname}) (SELECT username_id FROM usernames Where username === ${messages.username}))

// how can we associate the username string and roomname string with the foreign key on insert

 // whole thing to return a promise
        // return Promise.resolve(result)
        // might need to return all on line 8

