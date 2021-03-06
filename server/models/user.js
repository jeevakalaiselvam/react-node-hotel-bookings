import mongoose from 'mongoose';
import { intersects } from 'semver';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
import { r, b, g, y } from '../util/log';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User must have a name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'User must have an email'],
      unique: [true, 'Email should be unique'],
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

// IMPORTANT POINTS
// 1. While saving user password, Hash it while saving the first time.
// 2. While user updates password, Hash and save the new password
// 3. Using pre middleware is key that will run before each time user saved/created.

userSchema.pre('save', function (next) {
  let user = this;
  b('CHECKING USER MODEL INFO BEFORE SAVING');
  //Hash password only if user is changing password or registering for the first time
  //Using pre middle ware is important to hash the password
  //Use Bcrypt library for hashing

  //Check if user has modified password (this data comes from timestamps:true defined in schema for user)
  if (user.isModified('password')) {
    y('USER HAS MODIFIED PASSWORD, CHECKING FOR VALIDITY OF NEW PASSWORD');
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log('BCRYPT ERROR -> ', err);
        return next(err);
      }
      //Save the user password with hashed output data
      user.password = hash;
      return next();
    }); //Salt of 12 is normal, 8,12,16
  } else {
    return next(); //If password is not modified, Just move onto the next middleware in mongoose
  }
});

//Password comparison method when user login
//Matching passwords give TRUE
userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      r('PASSWORD COMPARISON ERROR IN MODEL METHOD USING BRCYPT COMPARE');
      return next(err, false);
    }

    //if no error, We get null on error
    g('PASSWORD COMPARISON SUCCESS IN MODEL METHOD USING BRCYPT COMPARE');
    return next(null, match);
  });
};

export default mongoose.model('User', userSchema);
