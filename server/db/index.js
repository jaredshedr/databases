var mysql = require('mysql2');
var { Sequelize, DataTypes } = require('sequelize');
var database = new Sequelize('chat', 'root', '', {host: '127.0.0.1', dialect:'mysql'});

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

var Message = database.define('message', {
  message_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roomname_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

var Username = database.define('username', {
  username_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

var Roomname = database.define('roomname', {
  roomname_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

Username.hasOne(Message, {
  foreignKey: "username_id",
  sourceKey: "username_id",
});

Roomname.hasOne(Message, {
  foreignKey: "roomname_id",
  sourceKey: "roomname_id",
});

try {
  database.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// console.log(database.models); // true

// var dbConnection = mysql.createConnection({
//  host: '127.0.0.1',
//  user: 'root',
// //  password: '',
//  database: 'chat'
// });

// dbConnection.connect((err) => {
//   if (err) {
//     console.log('error connecting', err)
//   } else {
//     console.log('connected')
//   }
// });


//module.exports.dbConnection = dbConnection;

module.exports.database = database;