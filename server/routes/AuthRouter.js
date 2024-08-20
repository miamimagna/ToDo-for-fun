const express = require('express');
const router = express.Router();
const {SignUp} = require('../controllers/authController');

router.post('/signup', SignUp)

module.exports = router;