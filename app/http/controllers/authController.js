const passport = require('passport'); // Add this line to import passport
const User = require('../../models/user');
const bcrypt = require('bcrypt');
function authController() {
    const _getRedirectUrl = (req) => {
        console.log('User role:', req.user.role); // Debug log
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders';
    }

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

                    console.log('User logged in successfully');
                    return res.redirect(_getRedirectUrl(req));
                });
            })(req, res, next);
        },
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
                const existingUser = await User.findOne({ email });
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
                    password: hashedPassword,
                    role: 'customer' // Default role, adjust if needed
                });

                await user.save();
                return res.redirect('/');
            } catch (err) {
                console.error(err);
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            }
        },
        logout(req, res) {
            req.logout((err) => {
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
