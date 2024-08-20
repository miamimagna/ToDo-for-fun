const express = require('express');
const router = express.Router();
const {SignUp, Login, Update, Logout} = require('../controllers/authController');
const AuthChecker = require('../middleware/AuthChecker')

router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/update', AuthChecker, Update);
router.post('/logout', Logout);

module.exports = router;