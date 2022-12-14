/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat'
  });

  beforeAll((done) => {
    dbConnection.connect();

       const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
    .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
      const username = 'Valjean';
      const message = 'test';
      const roomname = 'Hello';
      const queryString = 'INSERT INTO messages (message, roomname_id, username_id) values(?, (SELECT roomname_id FROM roomnames WHERE roomname = ?), (SELECT username_id FROM usernames WHERE username = ?))';
      const queryArgs = [message, roomname, username];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[1].message).toEqual(message);
          expect(messageLog[1].roomname_id).toEqual(1);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('Should correctly link foreign keys in the DB', (done) => {
    const username = 'Valjean';
    const message = 'this is a new message';
    const roomname = 'rooms and stuff';

    dbConnection.query(`INSERT IGNORE INTO roomnames(roomname) VALUES(?)`, [roomname], (err) => {
      if (err) {
        throw err;
      }
    })

    const queryString = 'INSERT INTO messages (message, roomname_id, username_id) values(?, (SELECT roomname_id FROM roomnames WHERE roomname = ?), (SELECT username_id FROM usernames WHERE username = ?))';
    const queryArgs = [message, roomname, username];

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[2].message).toEqual(message);
          expect(messageLog[2].roomname_id).toEqual(2);
          expect(messageLog[1].username_id).toEqual(1);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

  });
});
