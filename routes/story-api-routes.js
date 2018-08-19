var db = require("../models");

module.exports = function(app) {
  // Get all Stories
  app.get("/api/stories", function(req, res) {
    db.Story.findAll({}).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Get a story by story id
  app.get("/api/stories/:id", function(req, res) {
    db.Story.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Get a story by genre id
  app.get("/api/stories/genre/:id", function(req, res) {
    db.Story.findOne({
      where: {
        genre_id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Create a new story
  app.post("/api/stories", function(req, res) {
    db.Story.create(req.body).then(function(dbStory) {
      res.json(dbStory);
      console.log(dbStory);
    });
  });

  // Delete a story by id
  app.delete("/api/stories/:id", function(req, res) {
    db.Story.destroy({ where: { id: req.params.id } }).then(function(dbStory) {
      res.json(dbStory);
    });
  });
};
