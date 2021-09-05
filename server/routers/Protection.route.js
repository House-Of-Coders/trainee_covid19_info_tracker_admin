const express = require('express');
const router = express.Router();
const { protectUser } = require('../controllers/Protection.controller');
const { protect } = require('../middleware/Authntication.middleware');


router.route('/user').get(protect, protectUser);

module.exports = router;