const Post = require('../models/post');
const Image = require('../utils/image');

async function createPost(req, res) {
  try {
    const post = new Post(req.body);
    post.createdDate = new Date();

    const imagePath = Image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(`${error}, error creating post`);
  }
}

async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdDate: 'desc' },
    };

    const paginatePosts = await Post.paginate({}, options);

    if (!paginatePosts) {
      return console.log('cant paginate posts');
    }

    res.status(200).send(paginatePosts);
  } catch (error) {
    res.status(400).send(`${error}, error getting posts`);
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = Image.getFilePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    const existingPost = await Post.findByIdAndUpdate(id, postData);

    if (!existingPost) {
      return res.status(404).send('cant find post');
    }
    res.status(200).send(existingPost);
  } catch (error) {
    res.status(400).send(`${error} error updating post`);
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const existingPost = await Post.findByIdAndDelete(id);

    if (!existingPost) {
      return res.status(404).send('cant find post to delete');
    }

    res.status(200).send(existingPost);
  } catch (error) {
    res.status(400).send(`${error} error deleting post`);
  }
}

async function getPostByPath(req, res) {
  try {
    const { path } = req.params;

    const existingPost = await Post.findOne({
      path,
    });

    if (!existingPost) {
      return res.status(404).send('cant find postbypath');
    }
    res.status(200).send(existingPost);
  } catch (error) {
    res.status(400).send(`${error}, error getting postbypath`);
  }
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostByPath,
};
