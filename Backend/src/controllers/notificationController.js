const User = require("../models/user2");
const Notification = require("../models/notification");

const addNotification = async (req, res) => {
  const { proficientId, userId, type, title, message, status } = req.body;
  try {
    const user = await User.findById(proficientId);
    const newNotification = new Notification({
      userId: proficientId,
      fromUser: userId,
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

const getNotification = async (req, res) => {
  const { id } = req.params;
  try {
    //! Get all notifications for the user
    const notifications = await Notification.find({
      userId: id,
    }).lean();
    //! Get all unique Ids fromUserIds
    const fromUserIds = [
      ...new Set(
        notifications.map((notification) => notification.fromUser.toString())
      ),
    ];
    //! Get all users information from the User using the fromUserIds
    const fromUsersInformation = await User.find({
      _id: { $in: fromUserIds },
    })
      .select("profile.firstName profile.lastName profile.profilePicture")
      .lean();
    //! Create a map of users with their _id as the key
    const usersMap = fromUsersInformation.reduce((acc, user) => {
      acc[user._id] = user.profile;
      return acc;
    }, {});

    const finalResults = notifications.map((notification) => {
      const fromUser = usersMap[notification.fromUser];
      return {
        id: notification._id,
        title: notification.title,
        message: notification.message,
        firstName: fromUser.firstName,
        lastName: fromUser.lastName,
        profilePicture: fromUser.profilePicture,
        status: notification.status,
        type: notification.type,
        date: notification.createdAt,
      };
    });

    console.log(finalResults);
    res.status(200).json({ finalResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

const updateNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    notification.status = "Read";
    await notification.save();
    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating notification" });
  }
};

module.exports = { addNotification, getNotification, updateNotification };
