const express = require('express');
const controller = require('../controllers/controller')
const router = express.Router();

router.post('/send-code', controller.sendVerificationCode);
router.post('/verify-code', controller.verifyCode)

module.exports = router;