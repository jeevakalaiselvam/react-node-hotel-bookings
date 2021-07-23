import User from '../models/user';

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
