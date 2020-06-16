const express = require("express");
const router = express.Router()
const { body } = require("express-validator/check");
const authController = require("./../controllers/auth")
const User = require("./../models/user")
const isAuth = require("./../middleware/is-auth")

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

router.get('/status', isAuth, authController.getUserStatus);
router.patch(
    '/status',
    isAuth,
    [
        body('status')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.updateUserStatus
);

router.post('/login', authController.login)

module.exports = router;