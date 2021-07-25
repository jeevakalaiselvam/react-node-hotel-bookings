import User from "../models/user";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { g, r, b, y } from "../util/log";

export const register = async (req, res) => {
  g("REGISTER ROUTE HIT:PARAMS -> ", req.params);
  g("REGISTER ROUTE HIT:BODY -> ", req.body);

  //Validation
  if (!name) return res.status(400).send("Name is required");
  if (!email) return res.status(400).send("Email is required");
  if (!password) return res.status(400).send("Password is required");

  //Check email is already present in database, Show error if yes
  let userExist = await User.findOne({ email: email }).exec();
  if (userExist) return res.status(400).send("Email is taken");

  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be min 6 chracters long");

  //Register use now
  const user = new User({ name, email, password });
  try {
    await user.save();
    g("USER CREATED -> ", user);
    return res.json({ ok: true });
  } catch (err) {
    g("USER CREATE FAILED -> ", err);
    return res.status(400).send("Error, Try again!");
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
  g("LOGIN ROUTE HIT:PARAMS -> ", req.params);
  g("LOGIN ROUTE HIT:BODY -> ", req.body);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      r("USER NOT FOUND");
      return res.status(400).send("User with email not found!");
    } else {
      g("USER FOUND -> ", user);
      b("CHECKING IF PASSWORDS ARE SAME");
      user.comparePassword(password, (err, match) => {
        if (!match || err) {
          r("PASSWORDS DO NOT MATCH");
          return res.status(400).send("Please enter the correct password..");
        }
        g("PASSWORD VERIFIED -> GENERATING JSON WEB TOKEN");
        let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        b("JSON WEB TOKEN AND USER DATA SENT");
        res.json({
          token: token,
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stripe_account_id: user.stripe_account_id,
            stripe_seller: user.stripe_seller,
            stripeSession: user.stripe,
          },
        });
      });
    }
  } catch (err) {
    r("ERROR IN LOGIN -> ", err);
    res.status(400).send("Sign in failed!");
  }
};
