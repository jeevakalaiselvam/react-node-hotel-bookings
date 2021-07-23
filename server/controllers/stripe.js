import User from '../models/user';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  console.log(
    'JWT TOKEN IN HEADER -> ',
    req.headers.authorization.split(' ')[1]
  );
  console.log('USER OBTAINED FROM REQUIRE SIGN IN MIDDLEWARE -> ', req.user);
  console.log('CONNECTING USER WITH STRIPE');

  //1.Find the user
  const user = await User.findById(req.user._id).exec();
  console.log('USER AUTHENTICATED -> ', user);

  //2.If user dont have stripe_account_id, Create one now.
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'express',
    });
    console.log('STRIPE ACCOUNT CREATED -> ', account);
    //Saving user id via Mongoose
    user.stripe_account_id = account.id;
    user.save();
    console.log('USER STRIPE ID CREATED AND SAVED IN DB');
  }
  console.log('USER STRIPE ID ALREADY PRESENT IN DB');
  console.log('CREATING LOGIN LINK FOR USER BASED ON STRIPE LOGIN');
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REFRESH_URL,
    return_url: process.env.STRIPE_RETURN_URL,
    type: 'account_onboarding',
  });

  console.log('PREFILLING USER INFO IN ONBOARDING FORM');
  accountLink = Object.assign({
    'stripe_user[email]': user.email || undefined,
  });
  console.log('USER INFO PREFILLED FOR FRONT END', accountLink);
};
