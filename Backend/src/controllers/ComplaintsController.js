const Report = require('../models/Complaints');  
const mongoose = require('mongoose');

exports.createReport = async (req, res) => {
  try {
    const { userId, reportedUserId, documentationImage, reportText } = req.body;

    if (!userId || !reportedUserId || !documentationImage || !reportText) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReport = new Report({
      user: userId,           // Reporter
      reportedUser: reportedUserId,  // Person being reported
      documentationImage, 
      reportText,
    });
    const savedReport = await newReport.save();
    
    res.status(201).json({ message: 'Report created successfully', report: savedReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('user', 'username email')  // Populate reporter details
      .populate('reportedUser', 'username email');  // Populate reported person details
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
