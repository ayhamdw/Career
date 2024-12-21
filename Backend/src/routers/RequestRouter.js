const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
    addToaAceptedRequestReceived,
    getAcceptedReceivedRequestByEmail,
    getRejectedReceivedRequestByEmail,
} = require("../controllers/RequestController");


router.post('/acceptedRequestReceived',addToaAceptedRequestReceived);
router.post('/getAcceptedReceivedRequest',getAcceptedReceivedRequestByEmail);
router.post('/getRejectedReceivedRequest',getRejectedReceivedRequestByEmail);



module.exports = router;