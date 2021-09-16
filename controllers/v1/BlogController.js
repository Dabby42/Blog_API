import autoBind from 'auto-bind';
import BaseController from './BaseController';
import Blog from '../../models/Blog';
import Comment from '../../models/Comment';
import dotenv from 'dotenv';

//If blog requires an image
//import imageService from '../../services/ImageService';
//const service = new imageService('cloudinary');

dotenv.config();

class BlogController extends BaseController {
  constructor() {
    super();
    autoBind(this);
  }
  /**
   * @api {post} /v1/blog Create Blog
   * @apiName Create Blog
   * @apiGroup Blog
   * @apiParam {String} subject Blog Subject
   * @apiParam {String} category Blog Category
   * @apiParam {String} content Blog Content Description
   */
  async createBlog(req, res) {
    let { userId, contents, subject, category} = req.body;

    try {
      let data = {
        subject,
        category,
        contents,
        user: userId
      };

      let blog = new Blog(data);
      await blog.save();

      return super.success(res, blog, 'Created blog successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't create blog`);
    }
  }

  
  /**
   * @api {get} /v1/blog Get Blogs
   * @apiName Get Blogs
   * @apiGroup Blog
   */
  async getAllBlogs(req, res) {
    try {
      let totalBlog = await Blog.estimatedDocumentCount({});
      let pageOptions = super.getPaginationOptions(req);
      const {skipper, limit} = pageOptions

      let blogs = await Blog.find()
        .skip(skipper)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('user')
        .exec();

      let meta = super.getMeta(pageOptions, totalBlog);
      return super.successPaginated(res, blogs, meta, 'Blogs retrieved successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/blog/:id Get Single Blog
   * @apiName Get Single Blog
   * @apiGroup Blog
   */
  async getSingleBlog(req, res) {
    try {
      let blog = await Blog.findOne({ _id: req.params.id });

      return super.success(res, blog, 'Blog retrieved successfully');
    } catch (err) {
      // console.log(err);
      return super.actionFailure(res, `Couldn't retrieve blog`);
    }
  }

  /**
   * @api {patch} /v1/blog/:id Update Blog
   * @apiName Update Blog
   * @apiGroup Blog
   */
  async updateBlog(req, res) {
    const { contents, category, subject} = req.body;
    const id = req.params.id
    try {
      //checks if fields exists and update blog
      if (contents || category || subject){
        await Blog.findOneAndUpdate(
          { _id: id },
          req.body
        );
      }

      
      return super.actionSuccess(res, 'Blog updated successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't update blog`);
    }
  }

  /**
   * @api {delete} /v1/blog/:id Delete Blog
   * @apiName Delete Blog
   * @apiGroup Blog
   */
  async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      await Blog.findOneAndDelete({ _id: id });
      return super.actionSuccess(res, 'Blog deleted successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, `Couldn't delete Blog`);
    }
  }

  /**
   * @api {post} /v1/blog/:id/comment Comment on Blog
   * @apiName Comment on Blog
   * @apiParam {String} comment User comment
   * @apiGroup Blog
   */
  async comment(req, res) {
    try {
      const {id} = req.params;
      const { comment, userId } = req.body;
      let blog = await Blog.findOne({ _id: id });
      const comments = new Comment({ user: userId, comment, blog: id });
      await comments.save();
      blog.comments.push(comments);
      await blog.save();
      console.log(comment);
      return super.actionSuccess(res, 'Commented on blog successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/blog/:id/comment Get Comments on Blog
   * @apiName Get Comments on Blog
   * @apiGroup Blog
   */
  async getBlogComments(req, res) {
    try {
      const { id } = req.body;
      
      let pageOptions = super.getPaginationOptions(req);
      const {skipper, limit} = pageOptions;

      let comments = await Comment.find({ blog: id })
        .skip(skipper)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('user')
        .exec();

      let totalComment = comments.length;
      let meta = super.getMeta(pageOptions, totalComment);
      return super.successPaginated(res, comments, meta, 'Comments retrieved successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/blog/:id/comment/:commentId Get Single Comment on Blog
   * @apiName Get Single Comment on Blog
   * @apiGroup Blog
   */
   async getSingleComment(req, res) {
    try {
      const { commentId } = req.params;
      let comment = await Comment.findById({ _id: commentId })
        .populate('user')
        .exec();

      return super.success(res, comment, 'Comment retrieved successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {get} /v1/blog/:id/comment/:commentId Update Comment on Blog
   * @apiName Update Comment on Blog
   * @apiParam {String} comment New comment on Blog
   * @apiGroup Blog
   */
   async updateComment(req, res) {
    try {
      const {commentId} = req.params;
      const { comment } = req.body;
      await Comment.findOneAndUpdate({ _id: commentId }, {comment});

      return super.success(res, 'Comments updated successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

  /**
   * @api {delete} /v1/blog/:id/comment/:commentId Comment on Blog
   * @apiName UnComment on Blog
   * @apiGroup Blog
   */
  async deleteComment(req, res) {
    try {
      const {commentId} = req.params;
      await Comment.findOneAndDelete({ _id: commentId});
      return super.actionSuccess(res, 'Comment deleted successfully');
    } catch (err) {
      console.log(err);
      return super.actionFailure(res, err.message);
    }
  }

}

module.exports = BlogController;
