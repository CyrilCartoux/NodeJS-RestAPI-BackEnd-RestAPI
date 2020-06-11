const express = require("express")
const { body } = require("express-validator/check");
const router = express.Router();
const feedController = require("./../controllers/feed");

// GET /feed/posts
router.get("/posts", feedController.getPosts);
// GET /feed/post/:postId
router.get("/post/:postId", feedController.getPost)

// POST /feed/posts
router.post("/post", [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5})
], feedController.postPost);

module.exports = router