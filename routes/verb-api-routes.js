var db = require("../models");

module.exports = function(app) {
  // Get all Snippets
  app.get("/api/verbs", function(req, res) {
    db.Verb.findAll({}).then(function(dbStory) {
      res.json(dbStory);
    });
  });

// Get a story by genre id
app.get("/api/verbs/genre/:id", function(req, res) {
    db.Verb.findOne({
      where: {
        genre_id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Create a new story
  app.post("/api/verbs", function(req, res) {
    db.Verb.create(req.body).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Delete a story by id
  app.delete("/api/verbs/:id", function(req, res) {
    db.Verb.destroy({ where: { id: req.params.id } }).then(function(dbStory) {
      res.json(dbStory);
    });
  });
};