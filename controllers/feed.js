const { validationResult } = require("express-validator/check")

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'first post',
            content: 'this is the content',
            imageUrl: 'images/btc.jpg',
            creator: { name: 'Satoshi' },
            createdAt: new Date()
        }]
    })
}

exports.postPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, data incorrect',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    // @TODO : create post in database
    res.status(201).json({
        message: 'post created successfully',
        post: {
            _id: new Date().toUTCString(),
            title: title,
            content: content,
            creator: {
                name: 'Satoshi'
            },
            createdAt: new Date()
        }
    })
} 