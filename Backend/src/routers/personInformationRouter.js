const express = require('express');
const { getUserRoleByEmail } = require('../controllers/getPersonInformation'); 
const router = express.Router();


router.post('/role', getUserRoleByEmail);
  module.exports = router;