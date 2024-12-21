const express = require('express');
const router = express.Router();
const User = require('../models/user2');

const addToaAceptedRequestReceived = async (req, res) => {
  const { userId, myId } = req.body;

  try {
    if (!userId || !myId) {
      return res.status(400).json({ message: "User ID and My ID are required." });
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
    const recipientUser = await User.findById(userId);
    if (!recipientUser) {
      return res.status(404).json({ message: "Recipient user not found." });
    }
    if (!recipientUser.acceptedRequestsSent.includes(myId)) {
      recipientUser.acceptedRequestsSent.push(myId);
    }
    recipientUser.sendProficientRequests = recipientUser.sendProficientRequests.filter(
      (id) => id.toString() !== myId
    );
    await user.save();
    await recipientUser.save();
    return res.status(200).json({
      message: "Request successfully moved to acceptedRequestReceived, myId added to acceptedRequestsSent, and removed from sendProficientRequest.",
      user,
      recipientUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

const addToRejectRequestReceived = async (req, res) => {
  const { userId, myId } = req.body;

  try {
    if (!userId || !myId) {
      return res.status(400).json({ message: "User ID and My ID are required." });
    }
    const user = await User.findOne({ receiveProficientRequest: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found or no such request exists." });
    }
    if (!user.rejectedRequestReceived.includes(userId)) {
      user.rejectedRequestReceived.push(userId);
    }
    user.receiveProficientRequest = user.receiveProficientRequest.filter(
      (id) => id.toString() !== userId
    );
    const recipientUser = await User.findById(userId);
    if (!recipientUser) {
      return res.status(404).json({ message: "Recipient user not found." });
    }
    if (!recipientUser.rejectedRequestSent.includes(myId)) {
      recipientUser.rejectedRequestSent.push(myId);
    }

    recipientUser.sendProficientRequests = recipientUser.sendProficientRequests.filter(
      (id) => id.toString() !== myId
    );
    await user.save();
    await recipientUser.save();
    return res.status(200).json({
      message: "Request successfully moved to acceptedRequestReceived, and myId added to acceptedRequestsSent.",
      user,
      recipientUser,
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

const getAcceptedSentRequest = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const acceptedRequestsSentUsers = await User.find({
      _id: { $in: user.acceptedRequestsSent },
    });

    return res.status(200).json({
      user: acceptedRequestsSentUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred.", error });
  }
};
const getRejectedSentRequest = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const rejectedSentRequesttUsers = await User.find({
      _id: { $in: user.rejectedSentRequest },
    });

    return res.status(200).json({
      user: rejectedSentRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred.", error });
  }
};


module.exports = {
  addToaAceptedRequestReceived,
  getAcceptedReceivedRequestByEmail,
  getRejectedReceivedRequestByEmail,
  addToRejectRequestReceived,
  getAcceptedSentRequest,
  getRejectedSentRequest,
}
