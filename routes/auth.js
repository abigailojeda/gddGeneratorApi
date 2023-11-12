const {Router} = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, validateToken, getAllUsers } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


//create user
router.post('/signup', [
    check('username', 'username is mandatory').not().isEmpty(),
    check('email', 'email is mandatory').isEmail(),
    check('password', 'password need to have 6 characters as minimum').isLength({min:6}),
    validateFields
], createUser)

//login
router.post('/signin', [
    check('email', 'email is mandatory').isEmail(),
    check('password', 'password need to have 6 characters as minimum').isLength({min:6}),
    validateFields
], loginUser)

//validate token
router.get('/token', validateJWT , validateToken)

//getAllUsers
router.get('/getAllUsers', getAllUsers)

module.exports = router;