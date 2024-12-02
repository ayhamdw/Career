const express = require('express');
const { sendVerificationCode } = require('../emails/account'); 
const router = express.Router();

router.post('/send-verification', (req, res) => {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).send({ error: "Email and code are required!" });
    }
  
    sendVerificationCode(email, code)
      .then(() => res.status(200).send({ message: "Verification email sent!" }))
      .catch((error) => {
        console.error("Error sending email:", error); 
        res.status(500).send({ error: "Failed to send email", details: error.message });
      });
  });

module.exports = router;
