const express = require('express');
const router = express.Router();
const { addDistrict, getAllDistrict, getDistrictById, updateDistrict, deleteDistrict } = require('../controllers/District.controller');


router.route('/add-district').post(addDistrict);
router.route('/get-all-district').get(getAllDistrict);
router.route('/get-one-district/:id').get(getDistrictById);
router.route('/update-district/:id').put(updateDistrict);
router.route('/delete-district/:id').delete(deleteDistrict);

module.exports = router;