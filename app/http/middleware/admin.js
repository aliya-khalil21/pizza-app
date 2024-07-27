// admin.js
function admin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    return res.redirect('/login'); // Or any other page you want non-admin users to be redirected to
}

module.exports = admin;
