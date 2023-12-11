const express = require('express');
const postController = require('../controllers/post');

const md_auth = require('../middlewares/auth');
const multiparty = require('connect-multiparty');

const md_upload = multiparty({ uploadDir: './uploads/blog' });

const api = express.Router();

api.post('/post', [md_auth.asureAuth, md_upload], postController.createPost);
api.get('/posts', postController.getPosts);
api.get('/post/:path', postController.getPostByPath);
api.patch(
  '/post/:id',
  [md_auth.asureAuth, md_upload],
  postController.updatePost
);
api.delete(
  '/post/:id',
  [md_auth.asureAuth, md_upload],
  postController.deletePost
);

module.exports = { api };
