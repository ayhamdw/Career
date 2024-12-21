const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
    addToaAceptedRequestReceived,
    addToRejectRequestReceived,
    getAcceptedReceivedRequestByEmail,
    getRejectedReceivedRequestByEmail,
} = require("../controllers/RequestController");


router.post('/acceptedRequestReceived',addToaAceptedRequestReceived);
router.post('/RejectRequestReceived',addToRejectRequestReceived);
router.post('/getAcceptedReceivedRequest',getAcceptedReceivedRequestByEmail);
router.post('/getRejectedReceivedRequest',getRejectedReceivedRequestByEmail);



module.exports = router;