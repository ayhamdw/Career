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


const getReceiveProficientRequestByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email provided' });
  }

  try {
    const user = await User.findOne({ email })
      .populate('receiveProficientRequest')  
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.receiveProficientRequest);
  } catch (error) {
    console.error('Error retrieving proficient request:', error.message);
    return res.status(500).json({ message: 'Error retrieving proficient requests Receive' });
  }
};

const getSentProficientRequestByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email provided' });
  }

  try {
    const user = await User.findOne({ email })
      .populate('sendProficientRequests')  
      .exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.sendProficientRequests);
  } catch (error) {
    console.error('Error retrieving proficient request:', error.message);
    return res.status(500).json({ message: 'Error retrieving proficient requests Sent' });
  }
};

const getUsersByCategory = async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    let users;
    if (category === "All Providers") {
      users = await User.find({});
    } else {
      users = await User.find({ careerCategory: category });
    }

    if (users.length === 0) {
      return res.status(200).json({ message: 'No users found for this category' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getUserByEmail = async(req, res) => {
  const {email} = req.body;

  if(!email){
    return res.status(400).json({success: false, message: 'Email is required'});
  }

  try{
    const user = await User.findOne({email});
    if(!user){
      return res.tatus(404).json({success: false, message: 'User Not Found'});
    }
    res.status(200).json({success: true, data:user});
    
  }
  catch(error){
    res.status(500).json({success: false, message:error.message});
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({ success: false, message: 'User Not Found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateImage = async (req, res) => {
  const { userId, profileImageUrl } = req.body;

  if (!userId || !profileImageUrl) {
    return res.status(400).json({ message: 'UserId and profileImageUrl are required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 'profile.profileImage': profileImageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile image updated successfully',
      profileImageUrl: updatedUser.profile.profileImage, 
    });
  } catch (err) {
    console.error('Error updating profile image:', err);
    res.status(500).json({ message: 'Error updating profile image' });
  }
};


const updateInfo = async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;

  try {
    // Dynamically build the update object
    const updateFields = {};

    // if (!updateData.password) delete updateData.password;
    // if (!updateData.gender) delete updateData.gender;
    // if (!updateData.dateOfBirth) delete updateData.dateOfBirth;

    if (updateData.username !== undefined) updateFields.username = updateData.username;
    if (updateData.email !== undefined) updateFields.email = updateData.email;
    if (updateData.gender !== undefined) updateFields.gender = updateData.gender;
    if (updateData.city !== undefined) updateFields.city = updateData.city;
    if (updateData.dateOfBirth !== undefined) updateFields.dateOfBirth = updateData.dateOfBirth;
    if (updateData.career !== undefined) updateFields.career = updateData.career;
    if (updateData.careerCategory !== undefined) updateFields.careerCategory = updateData.careerCategory;

    // Profile nested fields
    if (updateData.firstName !== undefined) updateFields['profile.firstName'] = updateData.firstName;
    if (updateData.lastName !== undefined) updateFields['profile.lastName'] = updateData.lastName;
    if (updateData.phone !== undefined) updateFields['profile.phone'] = updateData.phone;
    if (updateData.bio !== undefined) updateFields['profile.bio'] = updateData.bio;
    if (updateData.experience !== undefined) updateFields['profile.experience'] = updateData.experience;

    // Password handling (if provided, we don't allow empty password)
    if (updateData.password && updateData.password !== '') {
      updateFields.password = updateData.password;
    }

    // Update the user
    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true, // Return the updated user
      runValidators: true, // Ensure validators are run during update
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user information" });
  }
};


const checkIfUserRated = async (req, res) => {
  const { userId, targetUserId } = req.body;


  try {
    const user = await User.findOne({
      _id: targetUserId,
      "profile.ratings.userId": userId,
    }).exec();
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "User has rated the target user" });
    } else {
      return res.status(404).json({
        success: false,
        message: "User has not rated the target user",
      });
    }
  } catch (error) {
    console.error("Error checking user rating:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error checking rating" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Unable to fetch users' });
  }
};


const updateCertificateFile = async (req, res) => {
  try {
    const { userId, certificateFile } = req.body; 
    if (!userId || !certificateFile) {
      return res.status(400).json({ message: 'User ID and certificate file URL are required.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'certificate.certificateFile': certificateFile,
          'certificate.verificationStatus': 'pending', 
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Certificate file updated successfully', user });
  } catch (err) {
    console.error('Error updating certificate file:', err);
    res.status(500).json({ message: 'Internal server error' });
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
   getReceiveProficientRequestByEmail,
   getSentProficientRequestByEmail,
   getUserByEmail,
   getUserById,
   updateImage,
   updateInfo,
   checkIfUserRated,
   getAllUsers,
   updateCertificateFile,
  };
