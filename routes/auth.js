const express = require("express");
const router = express.Router()
const { body } = require("express-validator/check");
const authController = require("./../controllers/auth")
const User = require("./../models/user")

router.put('/signup', [
    body("email")
        .isEmail()
        .trim()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'E-Mail exists already, please pick a different one.'
                        );
                    }
                })
        })
        .normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Please enter a longer password"),
    body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please enter a name")
], authController.signup);

router.post('/login', authController.login)

module.exports = router;