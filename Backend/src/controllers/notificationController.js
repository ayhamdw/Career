const User = require("../models/user2");
const Notification = require("../models/notification");

const addNotification = async (req, res) => {
  const { proficientId, userId, type, title, message, status } = req.body;
  try {
    const proficient = await User.findById(proficientId);
    const user = await User.findById(userId);
    const newNotification = new Notification({
      userId: proficientId,
      fromUser: userId,
      type,
      title,
      message,
      status,
    });
    proficient.notifications.push(newNotification._id);
    await newNotification.save();
    await proficient.save();
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
        date: notification.createdAt,
        rated: notification.rated,
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

const rateProficient = async (req, res) => {
  try {
    const notificationId = req.params.currentNotificationId;
    const { rating, comment } = req.body;
    const notification = await Notification.findById(notificationId).lean();
    const ratedUserId = notification.fromUser;
    const userId = notification.userId;

    await User.findByIdAndUpdate(ratedUserId, {
      $push: {
        "profile.ratings": {
          rating,
          review: comment,
          userId,
        },
      },
    });

    // Mark the notification as rated and read
    await Notification.findByIdAndUpdate(notificationId, {
      rated: true,
      status: "Read",
    });

    res.status(200).json({ message: "Rated proficient" });
  } catch (error) {
    console.log("Error while rating proficient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addNotification,
  getNotification,
  updateNotification,
  rateProficient,
};
