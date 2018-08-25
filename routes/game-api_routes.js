var db = require("../models");

module.exports = function(app) {
  // Get all games info
  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Get a game by game id
  app.get("/api/games/:id", function(req, res) {
    db.Game.findOne({
      where: {
        game_id: req.params.id
      }
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Create a new game
  app.post("/api/games", function(req, res) {
    db.Game.create(req.body).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Update a game by id
  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });
};
