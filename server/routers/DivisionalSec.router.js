const express = require('express');
const router = express.Router();
const { addDivision, getAllDivision, getAllDivisionById, updateDivision, deleteDivision,
    getByDistrictId } = require('../controllers/DivisionalSec.controller');

router.route('/add-division').post(addDivision);
router.route('/get-all-division').get(getAllDivision);
router.route('/get-one-division/:id').get(getAllDivisionById);
router.route('/update-division/:id').put(updateDivision);
router.route('/delete-division/:id').delete(deleteDivision);
router.route('/get-divisions-by-district/:id').get(getByDistrictId);

module.exports = router;