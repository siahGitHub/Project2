var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
};

exports.signin = function(req, res) {
 
    //res.render('signin');
    res.render("signin", { login_errors: req.session.messages || [] });
req.session.messages = [];
 
};

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        //res.redirect('/');
        res.redirect('signin');
 
    });
 
}

exports.index = function(req, res) {
 
    res.render('index');
 
}