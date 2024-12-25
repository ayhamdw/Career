const User = require("../models/user2");
const Notification = require("../models/notification");

const addNotification = async (req, res) => {
  const { proficientId, type, title, message, status } = req.body;
  try {
    const user = await User.findById(proficientId);
    const newNotification = new Notification({
      userId: proficientId,
      type,
      title,
      message,
      status,
    });
    user.notifications.push(newNotification._id);
    await newNotification.save();
    await user.save();
    res.status(200).json({ message: "Notification added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addNotification };
