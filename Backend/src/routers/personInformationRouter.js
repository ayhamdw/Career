const express = require('express');
const { getUserRoleByEmail,
   getUserIdByEmail,
   getUserFirstNmaeByEmail,
   getUserLastNmaeByEmail,
   getBioByEmail,
   getCoordinatesByEmail,
   getUsersByCategory,
   getReceiveProficientRequestByEmail,
  } = require('../controllers/getPersonInformation'); 
const router = express.Router();


router.post('/role', getUserRoleByEmail);
router.post('/id', getUserIdByEmail);
router.post('/firstName', getUserFirstNmaeByEmail);
router.post('/lastName', getUserLastNmaeByEmail);
router.post('/bio', getBioByEmail);
router.post('/coordinates', getCoordinatesByEmail);
router.post('/users',getUsersByCategory);
router.post('/ReceiveProficient',getReceiveProficientRequestByEmail);

  module.exports = router;