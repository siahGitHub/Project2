var authController = require('../controllers/auth-controller.js');
 
module.exports = function (app, passport) {

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.get('/logout', authController.logout);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',

        failureRedirect: '/signup'
    }

    ));
/*
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/index',

        failureRedirect: '/signin'
    }

    ));
*/
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/index',

        failureRedirect: '/signin',
        failureMessage: "Invalid username or password"
    }));

    app.get("/index", isLoggedIn, authController.index);

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }

}