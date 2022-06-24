var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  } // a function which handles posting a message to the database
};




// models.messages.getAll()
//       .then((data) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           res.status(200).send(data);
//         }
//       })