const express = require('express');
const { getUserRoleByEmail , getUserIdByEmail} = require('../controllers/getPersonInformation'); 
const router = express.Router();


router.post('/role', getUserRoleByEmail);
router.post('/id', getUserIdByEmail);
  module.exports = router;