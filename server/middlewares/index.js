import expressJWT from 'express-jwt';

//If token is valid, It will given information in req.user for us to use it whenever we need
export const requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
