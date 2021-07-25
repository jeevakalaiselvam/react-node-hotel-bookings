import express from 'express';
import { register, login } from '../controllers/auth';
import { g, r, b, y } from '../util/log';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
