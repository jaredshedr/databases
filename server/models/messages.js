// var db = require('../db');
let db = require('../db');


// console.log(db.database);

module.exports = {
  getAll: function (callback) {
    db.database.models.message.sync()
    .then(() => {
      return db.database.models.message.findAll();
    })
    .then((messages) => {
      callback(null, messages);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  }, // a function which produces all the messages
  create: function (message, callback) {
    console.log(message);
    db.database.sync()
      .then(() => {
        db.database.models.roomname.create({ roomname: message.roomname })
          .catch((err) => {
            console.log('no duplicates')
          })
      })
      .then(() => {
        db.database.models.username.create({ username: message.username })
          .catch((err) => {
            console.log('no duplicates')
          })
      })
      .then(() => {
        return [db.database.models.username.findOne({
          where: {
            username: message.username
          }
        }), db.database.models.roomname.findOne({
          where: {
            roomname: message.roomname
          }
        })]
      })
      .then((promiseArray) => {
        console.log(promiseArray);
        // resolve promises then add message with create
        // db.database.models.message.create({message: message.message, roomname_id: , username_id: userID });
        // callback(null, 'success');
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      });
  } // a function which can be used to insert a message into the database
};


        // module.exports = {
        //   getAll: function (callback) {
        //     db.dbConnection.query('SELECT * FROM messages', (err, result) => {
        //       if (err) {
        //         console.log('error receiving all messages', err);
        //       } else {
        //         callback(null, result);
        //       }
        //     })
        //   }, // a function which produces all the messages

        //   create: function (message, callback) {
        //     console.log(message);
        //     db.dbConnection.query(`INSERT IGNORE INTO roomname(roomname) VALUES(?)`, [message.roomname], (err) => {
        //       if (err) {
        //         throw err;
        //       }
        //     })


        //     db.dbConnection.query(`INSERT INTO messages (message, roomname_id, username_id) values(?, (SELECT roomname_id FROM roomname WHERE roomname = ?), (SELECT username_id FROM username WHERE username = ?))`, [message.message, message.roomname, message.username],
        //     (err, result) => {
        //       if (err) {
        //         callback(err);
        //       } else {
        //         callback(null, result);
        //       }
        //     });

        //   } // a function which can be used to insert a message into the database
        // };