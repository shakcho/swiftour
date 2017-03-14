import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string(),
      email: Joi.string().email().required(),
      address: Joi.object().keys({
        lines: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
      }),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string(),
      email: Joi.string().email().required(),
      address: Joi.object().keys({
        lines: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
      }),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  //POST /api/guides
  createGuide:{
    body:{
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string(),
      email: Joi.string().email().required(),
      address: Joi.object().keys({
        lines: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
      }),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      skills: Joi.array().items(Joi.string()),
      languagesKnown: Joi.array().items(Joi.string()),
      licence: Joi.string().required(),

    }
  },

  // UPDATE /api/guides/:guideID
  updateGuide:{
    body:{
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string(),
      email: Joi.string().email().required(),
      address: Joi.object().keys({
        lines: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
      }),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      skills: Joi.array().items(Joi.string()),
      languagesKnown: Joi.array().items(Joi.string()),
      licence: Joi.string().required()
    },
    params: {
      guideId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
