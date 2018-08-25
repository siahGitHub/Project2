var db = require("../models");

module.exports = function(app) {
  // Get all characters info
  app.get("/api/chars", function(req, res) {
    db.Char.findAll({}).then(function(dbChar) {
      res.json(dbChar);
    });
  });

  // Get a character by character id
  app.get("/api/chars/:id", function(req, res) {
    db.Char.findOne({
      where: {
        Char_id: req.params.id
      }
    }).then(function(dbChar) {
      res.json(dbChar);
    });
  });

  // Get a character by gender
  app.get("/api/chars/gender/:gender", function(req, res) {
    db.Char.findAll({
      where: {
        gender: req.params.gender
      }
    }).then(function(dbChar) {
      res.json(dbChar);
    });
  });

  // Create a new character
  app.post("/api/chars", function(req, res) {
    db.Char.create(req.body).then(function(dbChar) {
      res.json(dbChar);
    });
  });

  // Update a character by id
  
  app.delete("/api/chars/:id", function(req, res) {
    db.Char.destroy({ where: { id: req.params.id } }).then(function(dbChar) {
      res.json(dbChar);
    });
  });
  
};
