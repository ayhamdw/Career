const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ComplaintsController');

router.post('/report', reportController.createReport);
router.post('/resolve/:complaintId', reportController.solveReport);
router.get('/reports', reportController.getAllReports);

module.exports = router;
