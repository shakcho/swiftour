import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Guide Schema
 */
const GuideSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true
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
    unique: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  licence: {
    type: String,
    required: true,
    unique: true
  },
  skills: {
    type: [String]
  },
  languagesKnown: {
    type: [String]
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

/**
 * Methods
 */
GuideSchema.method({
});

/**
 * Statics
 */
GuideSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Guide, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((guide) => {
        if (guide) {
          return guide;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Guide[]>}
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
 * @typedef Guide
 */
export default mongoose.model('Guide', GuideSchema);
