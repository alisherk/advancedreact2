const User = require('../models/User');
const jwt = require('jwt-simple');
const config = require('../config/dev');

//function that generates a unique token for authed user that uses userId
function generateUserToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports.signin = (req, res) => {
  // if user has already their email and passport, give them a token
  //req.user is supplied by passport service is user is signed in
  if (req.user) {
    res.send({ token: generateUserToken(req.user) });
  }
};

module.exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'please provide email and password' });
  }
  try {
    //if user exists, send an appropriate message
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    //else create a new user and save to db
    const user = await new User({
      email,
      password
    }).save();
    //generate a token for the user
    if (user) {
      return res.json({ token: generateUserToken(user) });
    }
    return res.status(500).send({ error: 'unable to create new user' });
  } catch (err) {
    console.log(err);
  }
};
