const User = require("../models/user2");

const getUserRoleByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email }); 

    if (user) {
      res.json({ role: user.role }); 
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserRoleByEmail };
