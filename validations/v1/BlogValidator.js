import Helpers from '../../helpers/helper';
const isBase64 = require('is-base64');
/**
 * Defines methods for validating Article functions
 *
 * @class ArticleValidator
 */
class ArticleValidator extends Helpers {
  constructor() {
    super();
  }
  /**
   * validates Registration data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateBlog(req, res, next) {
    const { image } = req.body;

    req.check('contents', 'content field is required').notEmpty().trim();

    req.check('subject', 'subject field is required').notEmpty().trim();

    req.check('category', 'category field is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

  /**
   * validates Comment data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateComment(req, res, next) {
    req.check('comment', 'Comment field is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

  /**
   * validates Registration data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateHasId(req, res, next) {
    req.body.id = req.params.id;
    req.check('id', 'id field is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }
}
module.exports = ArticleValidator;
