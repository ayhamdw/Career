const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
    addToaAceptedRequestReceived,
    addToRejectRequestReceived,
    getAcceptedReceivedRequestByEmail,
    getRejectedReceivedRequestByEmail,
    getAcceptedSentRequest,
    getRejectedSentRequest,
    getSendProficientRequests,
} = require("../controllers/RequestController");


router.post('/acceptedRequestReceived',addToaAceptedRequestReceived);
router.post('/RejectRequestReceived',addToRejectRequestReceived);
router.post('/getAcceptedReceivedRequest',getAcceptedReceivedRequestByEmail);
router.post('/getRejectedReceivedRequest',getRejectedReceivedRequestByEmail);
router.post('/acceptedSentRequest',getAcceptedSentRequest);
router.post('/RejectedSentRequest',getRejectedSentRequest);
router.post('/SendProficientRequests',getSendProficientRequests);



module.exports = router;