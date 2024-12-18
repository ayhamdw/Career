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


const getUserIdByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ userId: user._id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    res.status(500).json({ error: 'Error retrieving user ID' });
  }
};


const getUserFirstNmaeByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ firstName: user.profile.firstName });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving FirstName:', error);
    res.status(500).json({ error: 'Error retrieving FirstName' });
  }
};

const getUserLastNmaeByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ lastName: user.profile.lastName });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving lastName:', error);
    res.status(500).json({ error: 'Error retrieving lastName' });
  }
};

const getBioByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ bio: user.profile.bio });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving bio:', error);
    res.status(500).json({ error: 'Error retrieving bio' });
  }
};



const getCoordinatesByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Invalid or missing email" });
    }

    const user = await User.findOne({ email }, "profile.location.coordinates");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const coordinates = user.profile?.location?.coordinates;
    if (!coordinates || coordinates.length !== 2) {
      return res.status(404).json({ error: "Coordinates not found" });
    }
    return res.status(200).json({
      longitude: coordinates[0],
      latitude: coordinates[1],
    });
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const getUsersByCategory = async (req, res) => {
  const { category } = req.body; 

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const users = await User.find({ careerCategory: category });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this category' });
    }

    res.status(200).json(users); 
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = {
   getUserRoleByEmail,
   getUserIdByEmail,
   getUserFirstNmaeByEmail,
   getUserLastNmaeByEmail,
   getBioByEmail,
   getCoordinatesByEmail,
   getUsersByCategory,
  };
