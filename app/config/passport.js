const User = require('../models/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Login
            // Email exists
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log('No user with this email');
                return done(null, false, { message: 'No user with this email' });
            }

            // Password match
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                console.log('User logged in successfully');
                return done(null, user, { message: 'Logged successfully' });
            }

            console.log('Wrong username or password');
            return done(null, false, { message: 'Wrong username or password' });
        } catch (err) {
            console.log('Something went wrong:', err);
            return done(null, false, { message: 'Something went wrong' });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = init;
