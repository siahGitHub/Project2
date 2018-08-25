// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Genre.findAll({}).then(function(dbGenres) {
      res.render("index", {
        msg: "Welcome!",
        examples:dbGenres
      });
      console.log(dbGenres);
    });
  });
/*
  app.get("/home", function(req, res) {
      res.render("login", {
        msg: "Welcome!"
      });
  });
*/
  // Load example page and pass in an example by id
  app.get("/story/:id", function(req, res) {
    db.Story.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("story", {
        example: dbStory
      });
    });
  });
  
  //Moved this route into auth-api-routes for authentication
  /*
  app.get("/index", function(req, res){
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  })
  */
  // Render 404 page for any unmatched routes
  /*
  app.get("*", function(req, res) {
    res.render("404");
  });
  */
};
