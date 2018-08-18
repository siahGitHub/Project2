var db = require("../models");

module.exports = function(app) {
  // Get all Snippets
  app.get("/api/snippets", function(req, res) {
    db.Snippet.findAll({}).then(function(dbSnippets) {
      res.json(dbSnippets);
    });
  });

  // Get a snippet by story id
  app.get("/api/snippets/:id", function(req, res) {
    db.Snippet.findOne({
      where: {
        story_id: req.params.id
      }
    }).then(function(dbSnippet) {
      res.json(dbSnippet);
    });
  });

  // Create a new snippet
  app.post("/api/snippets", function(req, res) {
    db.Snippet.create(req.body).then(function(dbSnippet) {
      res.json(dbSnippet);
    });
  });

  // Delete an snippet by id
  app.delete("/api/snippets/:id", function(req, res) {
    db.Snippet.destroy({ where: { id: req.params.id } }).then(function(dbSnippet) {
      res.json(dbSnippet);
    });
  });
};
