const passport = require('passport');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },
        postlogin(req, res, next) {
            const { email, password } = req.body;
        
            // Validate request
            if (!email || !password) {  
                req.flash('error', 'All fields are required');
                return res.redirect('/login');
            }
           
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    console.log('Error during authentication:', err);
                    req.flash('error', info.message);
                    return next(err);
                }
                
                if (!user) {
                    console.log('No user found or incorrect credentials');
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
        
                req.logIn(user, (err) => {
                    if (err) {
                        console.log('Error during login:', err);
                        req.flash('error', info.message);
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        }
         ,
        register(req, res) {
            res.render('auth/register');
        },
        async postregister(req, res) {
            const { name, email, password } = req.body;

            // Validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            try {
                // Check if email exists
                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    req.flash('error', 'Email already taken');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a user
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                user.save().then((user)=>{
                    return res.redirect('/')
                });
                // Redirect to home page after successful registration
               
            } catch (err) {
                console.error(err);
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            }
        },
        logout(req, res) {
            req.logout((err) => { // Add the callback function
              if (err) {
                console.error(err); // Log the error for debugging
                return res.redirect('/login'); // Redirect even on error (optional)
              }
              res.redirect('/login'); // Redirect after successful logout
            });
          }
    }
}

module.exports = authController;
