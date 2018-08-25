var db = require("../models");

module.exports = function(app) {
  // Get all adjectives
  app.get("/api/adjectives", function(req, res) {
    db.Adjective.findAll({}).then(function(dbAdj) {
      res.json(dbAdj);
    });
  });

// Get adjectives by genre id
app.get("/api/adjectives/genre/:id", function(req, res) {
    db.Adjective.findOne({
      where: {
        genre_id: req.params.id
      }
    }).then(function(dbAdj) {
      res.json(dbAdj);
    });
  });

  // Create a new adjective
  app.post("/api/adjectives", function(req, res) {
    db.Adjective.create(req.body).then(function(dbAdj) {
      res.json(dbAdj);
    });
  });

  // Delete a adjective by id
  app.delete("/api/adjectives/:id", function(req, res) {
    db.Adjective.destroy({ where: { id: req.params.id } }).then(function(dbAdj) {
      res.json(dbAdj);
    });
  });
};