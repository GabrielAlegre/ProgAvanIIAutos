function checkLoggedIn(req, res, next) {
    res.locals.userLoggedIn = req.session && req.session.userId;
    next();
}

module.exports = checkLoggedIn ;
