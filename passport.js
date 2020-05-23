const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) 
        token = req.cookies["access_token"];
    return token;
}


// Authorization 
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "cooodes"
}, (payload, done) => { 
    User.findById({_id : payload.sub}, (err, user) => {
        if (err)
            return done(err, false)
        if (user)
            return done(null, user)
        else 
            return done(null, false)
    });
}));

// Authentication Local Strategy using username and password
// Only really used when we login
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        // If something went wrong with the database
        if (err)
            return done(err);
        // If there is no User
        if (!user)
            return done(null, false)
        // Check if password is correct
        user.comparePassword(password, done)
    });
}));