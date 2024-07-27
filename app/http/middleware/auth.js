function auth(req, res, next) {
   if (req.isAuthenticated()) {
       return next();  // If the user is authenticated, proceed to the next middleware or route handler
   }
   req.flash('error', 'You must be logged in to do that');
   return res.redirect('/login');  // If the user is not authenticated, redirect to the login page
}
module.exports = auth;
