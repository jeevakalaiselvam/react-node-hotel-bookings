import User from '../models/user';
import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  //Validation
  if (!name) return res.status(400).send('Name is required');
  if (!email) return res.status(400).send('Email is required');
  if (!password) return res.status(400).send('Password is required');

  //Check email is already present in database, Show error if yes
  let userExist = await User.findOne({ email: email }).exec();
  if (userExist) return res.status(400).send('Email is taken');

  if (!password || password.length < 6)
    return res
      .status(400)
      .send('Password is required and should be min 6 chracters long');

  //Register use now
  const user = new User({ name, email, password });
  try {
    await user.save();
    console.log('USER CREATED -> ', user);
    return res.json({ ok: true });
  } catch (err) {
    console.log('USER CREATE FAILED -> ', err);
    return res.status(400).send('Error, Try again!');
  }
};

// LOGIN MECHANISM
// Find user by email in database
// Compare user password hashed with incoming password hashed, Best implemented as methods in user model
// If hashed values are same, User is login success
// Send JWT response to use in front end
// JWT has expiry and allows users access until expiry time
// JWT tokens are used for protecting routes by usings roles in db
// Each time user access a protected router, We send the JWT in header from client and decode it to find user id and check if user has role for the route
// JWT token sent from client in header to server can be used to decode user id and maintain state of which user has logged in

export const login = async (req, res) => {
  console.log('LOGIN FORM RECEIVED IN EXPRESS', req.body);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      console.log('USER NOT FOUND');
      return res.status(400).send('User with email not found!');
    } else {
      console.log('USER FOUND -> ', user);
      console.log('CHECKING IF PASSWORDS ARE SAME');
      user.comparePassword(password, (err, match) => {
        if (!match || err) {
          console.log('PASSWORDS DO NOT MATCH');
          return res.status(400).send('Please enter the correct password..');
        }
        console.log('PASSWORD VERIFIED -> GENERATING JSON WEB TOKEN');
        let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        console.log('JSON WEB TOKEN AND USER DATA SENT');
        res.json({
          token: token,
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      });
    }
  } catch (err) {
    console.log('ERROR IN LOGIN -> ', err);
    res.status(400).send('Sign in failed!');
  }
};
