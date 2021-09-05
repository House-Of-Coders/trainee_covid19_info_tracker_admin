const express = require('express');
const router = express.Router();
const { addUser , userNameAvailability,userLogin ,getUserDetails,removeUserByID, validateUser } = require('../controllers/User.controller');

router.route('/user-name-check').get(userNameAvailability);
router.route('/add').post(addUser);
router.route('/validate').post(userLogin);
router.route('/get-all-users').get(getUserDetails);
router.route('/validate-user').get(validateUser);
router.route('/remove-user-by/:id').delete(removeUserByID);

module.exports = router;
