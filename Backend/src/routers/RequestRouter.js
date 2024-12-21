const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
    addToaAceptedRequestReceived,
    getAcceptedReceivedRequestByEmail,
} = require("../controllers/RequestController");


router.post('/acceptedRequestReceived',addToaAceptedRequestReceived);
router.post('/getAcceptedReceivedRequest',getAcceptedReceivedRequestByEmail);



module.exports = router;