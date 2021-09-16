import Helpers from '../../helpers/helper';
import { PROVIDER } from './../../config/enums';
import User from './../../models/User';

/**
 * Defines methods for validating Auth functions
 *
 * @class AuthValidator
 */
class AuthValidator extends Helpers {
  constructor() {
    super();
  }
  /**
   * validates Auth signup
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  async validateAuth(req, res, next) {
    let hasUser = null;
    let email = req.body.email;
    try {
      if (email) email = req.body.email.toLowerCase();
      if (email) req.body.email = req.body.email.toLowerCase();
      hasUser = await User.findOne({ email });
    } catch (error) {}
    req.check('firstName', 'First Name is required').notEmpty().trim();
    req.check('lastName', 'Last Name is required').notEmpty().trim();
    req
      .check('email', 'Email field is required')
      .notEmpty()
      .trim()
      .isEmail()
      .withMessage('Invalid email');
    req
      .check('password', 'Password is required')
      .notEmpty()
      .trim()
      .isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');

    req.check('email', 'Email already exists').custom(() => {
      return hasUser == null ? true : false;
    });
    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    req.body.email = email;
    return next();
  }

  /**
   * validates user sign up inputs
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateProfile(req, res, next) {
    req.check('firstName', 'First Name is required').notEmpty().trim();

    req.check('lastName', 'Last Name is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }

    return next();
  }

  /**
   * validates user sign up inputs
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validatePasswordLogin(req, res, next) {
    const { provider } = req.body;
    if (req.body.email) req.body.email = req.body.email.toLowerCase();

    req
      .check('email', 'Email field is required')
      .notEmpty()
      .trim()
      .isEmail()
      .withMessage('Invalid email');
    req
      .check('password', 'Password is required')
      .notEmpty()
      .trim()
      .isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }
}
module.exports = AuthValidator;
