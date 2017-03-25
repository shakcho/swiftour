import Promise from 'bluebird';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    lines: [String],
    city: String,
    state: String,
    zip: String,
    Country: String
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  role: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = this.encryptPassword(this.password);
  next();
})

/**
 * Methods
 */
UserSchema.method({
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
  // authenticate: function(plainTextPword) {
  //   bcrypt.compare(plainTextPword, this.password, function(err,res){
  //     if(err){
  //       console.log("Authenticate Error");
  //       console.log(err);
  //       next(err);
  //     }
  //     return res;
  //   }); 
  // }
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
