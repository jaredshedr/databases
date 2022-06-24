var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  post: function (req, res) {
    models.users.create(req.body, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  }
};
