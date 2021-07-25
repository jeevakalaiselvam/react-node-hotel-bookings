import User from "../models/user";
import chalk from "chalk";
import queryString from "query-string";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);
import { r, g, b, y } from "../util/log";

export const createConnectAccount = async (req, res) => {
  g("CREATE CONNECT ROUTE HIT:PARAMS -> ", req.params);
  g("CREATE CONNECT ROUTE HIT:BODY -> ", req.body);

  b("JWT TOKEN IN HEADER -> ", req.headers.authorization.split(" ")[1]);
  g("USER OBTAINED FROM REQUIRE SIGN IN MIDDLEWARE -> ", req.user);
  b("CONNECTING USER WITH STRIPE");

  //1.Find the user
  const user = await User.findById(req.user._id).exec();
  g("USER AUTHENTICATED -> ", user);

  //2.If user dont have stripe_account_id, Create one now.
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    g("STRIPE ACCOUNT CREATED -> ", account);
    //Saving user id via Mongoose
    user.stripe_account_id = account.id;
    user.save();
    g("USER STRIPE ID CREATED AND SAVED IN DB");
  }
  y("USER STRIPE ID ALREADY PRESENT IN DB");
  b("CREATING LOGIN LINK FOR USER BASED ON STRIPE LOGIN");
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REFRESH_URL,
    return_url: process.env.STRIPE_RETURN_URL,
    type: "account_onboarding",
  });

  b("PREFILLING USER INFO IN ONBOARDING FORM");
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  b("SENDING USER INFO PREFILLED FOR FRONT END ->", accountLink);
  b(
    `SENDING LOGIN LINK TO FRONT END -> ${
      accountLink.url
    }?${queryString.stringify(accountLink)}`
  );
  res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
};

//Update the delays days before payout it sent
const updateDelayDays = async (accountId) => {
  g("UPDATE DELAY DAYS BY 7 -> ");

  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  g("GET ACCOUNT STATUS ROUTE HIT: PARAMS -> ", req.params);
  g("GET ACCOUNT STATUS ROUTE HIT: BODY -> ", req.body);
  g("GET ACCOUNT STATUS ROUTE HIT: USER -> ", req.user);

  ///Get user from DB for user id in session, Get Stripe account from STRIPE for the user id and store it alongside user info in database
  const user = await User.findById(req.user._id).exec();
  const stripeAccount = await stripe.accounts.retrieve(user.stripe_account_id);

  if (!user) {
    r("USER NOT FOUND IN DATABASE");
  }
  if (!stripeAccount) {
    r("UNABLE TO OBTAIN STRIPE ACCOUNT FROM STRIPE");
  }

  if (user && stripeAccount) {
    g("USER OBTAINED FROM MONGODB -> ", user);
    g("STRIPE ACCOUNT FOR USER OBTAINED FROM STRIPE -> ", stripeAccount);
    //Updating user account to delay payment by a week
    const updatedAccount = await updateDelayDays(stripeAccount.id);
    g("PAYMENT DELAY UPDATED FOR 7 DAYS -> ", updatedAccount);
    b(
      "UPDATING STRIPE SELLER INFO OBTAINED FROM STRIPE INTO USERS DATABASE FOR USER"
    );
    //Find the user in db and update their seller info obtained from stripe into the database for that user
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        stripe_seller: updatedAccount,
      },
      {
        new: true,
      }
    )
      .select("-password")
      .exec(); //Select only particular info from database, For ex you may want to hide hashed password info. Use - for removing that entry try from select.
    g("USER STRIPE ACCOUNT DETAILS SAVED IN DATABASE ->", updateUser);
    res.json(updateUser);
  }
};

//Get account balanace from stripe for a user
export const getAccountBalance = async (req, res) => {
  g("GET ACCOUNT BALANCE ROUTE HIT: PARAMS -> ", req.params);
  g("GET ACCOUNT BALANCE ROUTE HIT: BODY -> ", req.body);
  g("GET ACCOUNT BALANCE ROUTE HIT: USER -> ", req.user);

  const user = await User.findById(req.user._id).exec();
  if (user) g("USER FOUND IN DB FOR CHECKING ACCOUNT BALANCE ->", user);
  else g("USER NOT FOUND IN DB FOR CHECKING ACCOUNT BALANCE ->", user);

  b("GETTING BALANCE FROM STRIPE FOR USER");
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    g("BALANCE OBTAINED FROM STRIPE -> ", balance);
    b("SENDING BALANCE TO CLIENT APP AS RESPONSE");
    res.json(balance);
  } catch (error) {
    r("ERROR WHILE GETTING ACCOUNT BALANCE -> ", error);
  }
};

//Get payour settings and link from stripe
export const payoutSetting = async (req, res) => {
  g("PAYOUT SETTING ROUTE HIT: PARAMS -> ", req.params);
  g("PAYOUT SETTING ROUTE HIT: BODY -> ", req.body);
  g("PAYOUT SETTING ROUTE HIT: USER -> ", req.user);

  const user = await User.findById(req.user._id).exec();
  if (user) g("USER FOUND IN DB FOR GETTING LINK FOR PAYOUT SETTING ->", user);
  else g("USER NOT FOUND IN DB FOR GETTING LINK FOR PAYOUT SETTING ->", user);

  b("GETTING USER STRIPE PROFILE SETTINGS URL FROM STRIPE");
  try {
    const settingsLoginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );

    g("GOT SETTINGS PROFILE LINK FROM STRIPE ->", settingsLoginLink);
    b("SENDING SETTINGS URL TO CLIENT");
    res.json(settingsLoginLink);
  } catch (err) {
    r("STRIPE PAYOUT SETTING ERROR ->", err);
  }
};
