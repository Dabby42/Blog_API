const express = require('express');
const routes = express.Router();
const BlogController = require('./../../controllers/v1/BlogController');
const BlogValdiator = require('../../validations/v1/BlogValidator');
const verifyTokenMiddleware = require('../../middleware/VerifyTokenMiddleware');

const { verifyToken } = new verifyTokenMiddleware();
const {
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getBlogComments,
  comment,
  getSingleComment,
  updateComment,
  deleteComment,
} = new BlogController();
const {
  validateBlog,
  validateHasId,
  validateComment,
} = new BlogValdiator();

routes.post('/', verifyToken, validateBlog, createBlog);
routes.get('/:id', verifyToken, getSingleBlog);
routes.get('/', verifyToken, getAllBlogs);
routes.patch('/:id', verifyToken, updateBlog);
routes.delete('/:id', verifyToken, deleteBlog);
routes.get('/:id/comment/', verifyToken, validateHasId, getBlogComments);
routes.get('/:id/comment/:commentId', verifyToken, validateHasId, getSingleComment);
routes.post('/:id/comment/', verifyToken, validateComment, comment);
routes.patch('/:id/comment/:commentId', verifyToken, validateHasId, validateComment, updateComment);
routes.delete('/:id/comment/:commentId', verifyToken, validateHasId, deleteComment);

module.exports = routes;
