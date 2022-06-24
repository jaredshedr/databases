CREATE DATABASE chat;

USE chat;

CREATE TABLE username (
  username_id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  PRIMARY KEY (username_id),
  UNIQUE (username)
);

CREATE TABLE roomname (
  roomname_id int NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(255) NOT NULL,
  PRIMARY KEY (roomname_id),
  UNIQUE (roomname)
);

CREATE TABLE messages (
  message_id int NOT NULL AUTO_INCREMENT,
  message VARCHAR(255) NOT NULL,
  username_id int NOT NULL,
  roomname_id int NOT NULL,
  PRIMARY KEY (message_id),
  FOREIGN KEY (username_id) REFERENCES username(username_id),
  FOREIGN KEY (roomname_id) REFERENCES roomname(roomname_id)
);

/* Create other tables and define schemas for them here! */


/*
CREATE TABLE classes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department INTEGER,
  teacher INTEGER,
  FOREIGN KEY(department) REFERENCES departments(id),
  FOREIGN KEY(teacher) REFERENCES teachers(id)
);
*/

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

