require("dotenv").config();
var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var cookieParser = require('cookie-parser');
var passport = require('passport')
//var passportConfig = require('./config/passport')
//var home = require('.routes/home')
//var application = require('./routes/application');

const SALT_WORK_FACTOR = 12;

var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/auth-api-routes")(app, passport);
require("./routes/snippet-api-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/verb-api-routes")(app);
require("./routes/story-api-routes")(app);
require("./routes/adjective-api-routes")(app);
require("./routes/chars-api-routes")(app);

//load passport strategies
require('./config/passport/passport.js')(passport, db.User);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
