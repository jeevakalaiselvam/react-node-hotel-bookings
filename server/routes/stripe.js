import express from 'express';
import { createConnectAccount } from '../controllers/stripe';
import { requireSignin } from '../middlewares';

const router = express.Router();

//Protect the route and if valid user, Connect their account to Stripe
router.post('/create-connect-account', requireSignin, createConnectAccount);

module.exports = router;
