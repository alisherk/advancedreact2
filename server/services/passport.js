const passport = require('passport');
const User = require('../models/User');
const config = require('../config/dev').secret;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//options for local strategy 
const localOptions = { usernameField: 'email'}

//create local strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
   //verify username and password and call done 
     const user = await User.findOne({ email });
     if (!user){
       return done(null, false);
     }
     //compare passwords => passport === user.password
     const isMatch = await user.comparePassword(password); 
     if(!isMatch) {
       return done(null, false)
     }
     //correct password, call done with user object
     return done(null, user);
     
   
}); 


//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth'), 
    secretOrKey: config
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  //see if the user id exists in db
  const user = await User.findById(payload.sub)
    //if it does call done with user object
    if (!user) {
      return done(null, false);
    }
    //otherwise call done without user object
    return done(null, user);
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
