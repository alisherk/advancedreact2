
//auth controller acts as the middleware when addeds to the routes
const auth = require('./controller/auth');
const passport = require('passport'); 

//this ensures that passport flow is added and appropriate routes are protected
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
      res.send({ authenticated: true });
  });
  app.post('/signup', auth.signup); 
  app.post('/signin', requireSignin, auth.signin);
};
