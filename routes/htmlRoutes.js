var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Verb.findAll({}).then(function(dbVerbs) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbVerbs
      });
      console.log(dbVerbs);
    });
  });

  // Load example page and pass in an example by id
  app.get("/story/:id", function(req, res) {
    db.Story.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("story", {
        example: dbStory
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
