import express from 'express';
import { createConnectAccount } from '../controllers/stripe';
import { requireSignin } from '../middlewares';
import {
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
} from '../controllers/stripe';
import { g, r, b, y } from '../util/log';

const router = express.Router();

//Protect the route and if valid user, Connect their account to Stripe
router.post('/create-connect-account', requireSignin, createConnectAccount);

router.post('/get-account-status', requireSignin, getAccountStatus);

router.post('/get-account-balance', requireSignin, getAccountBalance);

router.post('/payout-setting', requireSignin, payoutSetting);

module.exports = router;
