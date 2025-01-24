const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  reportedUser: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  documentationImage: { 
    type: String, 
    required: true,
  },
  reportText: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
