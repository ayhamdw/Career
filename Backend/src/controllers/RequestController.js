const express = require('express');
const router = express.Router();
const User = require('../models/user2');

const addToaAceptedRequestReceived = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findOne({ receiveProficientRequest: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found or no such request exists." });
    }

    if (!user.acceptedRequestReceived.includes(userId)) {
      user.acceptedRequestReceived.push(userId);
    }

    user.receiveProficientRequest = user.receiveProficientRequest.filter(
      (id) => id.toString() !== userId
    );

    await user.save();

    return res.status(200).json({
      message: "Request successfully moved to acceptedRequestReceived.",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred.", error });
  }
};



const getAcceptedReceivedRequestByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email provided' });
  }

  try {
    const user = await User.findOne({ email })
      .populate('acceptedRequestReceived')  
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.acceptedRequestReceived);
  } catch (error) {
    console.error('Error acceptedRequestReceived:', error.message);
    return res.status(500).json({ message: 'Error acceptedRequestReceived' });
  }
};

const getRejectedReceivedRequestByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email provided' });
  }

  try {
    const user = await User.findOne({ email })
      .populate('rejectedRequestReceived')  
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.rejectedRequestReceived);
  } catch (error) {
    console.error('Error rejectedRequestReceived:', error.message);
    return res.status(500).json({ message: 'Error rejectedRequestReceived' });
  }
};



module.exports = {
  addToaAceptedRequestReceived,
  getAcceptedReceivedRequestByEmail,
  getRejectedReceivedRequestByEmail,
}
