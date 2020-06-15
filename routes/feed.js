const express = require("express")
const { body } = require("express-validator/check");
const router = express.Router();
const feedController = require("./../controllers/feed");
const isAuth = require("./../middleware/is-auth")

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);
// GET /feed/post/:postId
router.get("/post/:postId", feedController.getPost)

// POST /feed/posts
router.post("/post", isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], feedController.postPost);

// PUT /feed/post/:postId
router.put("/post/:postId", isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], feedController.updatePost)

router.delete("/post/:postId", isAuth, feedController.deletePost)

module.exports = router