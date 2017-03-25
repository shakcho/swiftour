import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import Guide from '../models/guide.model';
import User from '../models/user.model';


// Get user, used for authentication

 
  

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Idea here was to show how jwt works with simplicity
  let username = req.body.username;
  let password = req.body.password;
  let role = req.body.role;
  let foundUser = {};
  // TODO: Add status if username and passowrd is not provided
  if (role === 'User'){
    User.findOne({username: username})
    .then(function(user){
    if(!user){
      res.status(401).send("No user with the given username");
    }else{
      if(!user.authenticate(password)){
        res.status(401).send("username and password incorrect");
      }else{
        const token = createToken(user);
          return res.status(200).send({
            token,
            username: user.username
        });
      }
    }
  },
  function(err){
    console.log(err);
    next(err);
  });
  }
  else if(role === 'Guide'){
    Guide.findOne({username: username})
    .then(function(user){
      if(!user){
        res.status(401).send("No user with the given username");
      }else{
        if(!user.authenticate(password)){
          res.status(401).send("username and password incorrect");
        }else{
          console.log("Found User\n");
          console.log(user);
          const token = createToken(user);
          console.log(token);
          return res.status(200).send({
            token,
            username: user.username
          });
        }
      }
    },
    function(err){
      //console.log(err);
      next(err);
    });
  }
  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * This is a Method to create Token for verified user 
 * @param user obj
 * @returns Token
 */
function createToken(user){
  return jwt.sign({
    id: user.id
  }, config.jwtSecret);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
