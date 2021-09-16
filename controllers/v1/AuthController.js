import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import autoBind from 'auto-bind';
import BaseController from './BaseController';
import User from './../../models/User';
import dotenv from 'dotenv';
import secrets from './../../config/secrets';

dotenv.config();

class AuthController extends BaseController {
  constructor() {
    super();
    autoBind(this);
  }
  /**
   * @api {post} v1/auth/login Login User with email and password
   * @apiName Login User with email and password
   * @apiGroup Auth
   * @apiParam {String} email user's email
   * @apiParam {String} password user's password
   */
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        const { firstName, email, _id, lastName } = user;
        let isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
          // generate short lived token
          let token = jwt.sign(
            { firstName, email, id: _id, lastName },
            secrets.jwtSecret,
            { expiresIn: secrets.jwtTtl }
          );

          req.body.userId = _id;
          user = await user.save();
          return super.success(
            res,
            { token, user },
            'Login Successful'
          );
        } else {
          return super.unauthorized(res, 'Invalid Credentials');
        }
      } else {
        return super.notFound(res, 'Account does not exist');
      }
    } catch (err) {
      console.log(err);
      return super.unauthorized(res, 'Invalid Credentials 1');
    }
  };

  /**
   * @api {post} v1/auth/register Authenticate User
   * @apiName Authenticate User
   * @apiGroup Auth
   * @apiParam {String} email user's email
   * @apiParam {String} firstName user's firstName
   * @apiParam {String} lastName user's lastName
   * @apiParam {String} password user's password
   */
  async register(req, res) {
    const { email, password, firstName, lastName } = req.body;

    let hashedPassword = bcrypt.hashSync(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    try {
      let newUser = await user.save();

      // generate short lived token
      let token = jwt.sign(
        { firstName, email, id: user._id, lastName },
        secrets.jwtSecret,
        { expiresIn: secrets.jwtTtl }
      );

      return super.success(
        res,
        { token, user },
        'Registration Successful'
      );
    } catch (error) {
      console.log(error);
      return super.actionFailure(res, 'Something went wrong');
    }
  }

  /**
   * @api {patch} v1/auth/profile Update User Profile
   * @apiName Update User Profile
   * @apiGroup Auth
   * @apiParam {String} firstName user's firstName
   * @apiParam {String} lastName user's lastName
   */
  async updateProfile(req, res) {
    const { userId, lastName, firstName } = req.body;

    try {
      let user = await User.findOneAndUpdate(
        { _id: userId },
        { firstName, lastName },
        { new: true }
      );
      return super.success(res, user, 'Profile updated');
    } catch (err) {
      return super.actionFailure(res, 'Couldnt update profile');
    }
  }

  /**
   * @api {get} v1/auth/profile Get User Profile
   * @apiName Get User Profile
   * @apiGroup Auth
   */
  async getProfile(req, res) {
    const { userId } = req.body;

    try {
      let user = await User.findOne({ _id: userId });
      return super.success(res, user, 'Profile retrieved');
    } catch (err) {
      return super.actionFailure(res, 'Couldnt retrieve profile');
    }
  }
}

module.exports = AuthController;
