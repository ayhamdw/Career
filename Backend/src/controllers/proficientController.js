const User = require("../models/user2");
const Booking = require("../models/Booking");
const axios = require("axios");

const getProficientData = async (req, res) => {
  try {
    const { id, careerCategory } = req.query;
    if (careerCategory === "All Proficient") {
      await User.find({ _id: { $ne: id } })
        .select("profile email city career careerCategory")
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(500).send("Error: " + error));
    } else {
      await User.find({ _id: { $ne: id }, careerCategory: careerCategory })
        .select("profile email city career careerCategory")
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(500).send("Error: " + error));
    }
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const reviews = await Promise.all(
      user.profile.ratings.map(async (rating) => {
        const reviewer = await User.findById(rating.userId).select(
          "profile.firstName profile.lastName profile.profileImage"
        );
        return {
          rating: rating.rating,
          review: rating.review,
          date: rating.date,
          reviewer: reviewer || null,
        };
      })
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBooking = async (req, res) => {
  const { proficientId, userId, requestDateTime, location } = req.body;
  try {
    const { latitude, longitude } = location;
    const locationAPI = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
    );
    const city = locationAPI.data.address.city || "Unknown City";
    const user = await User.findById(userId);
    const provider = await User.findById(proficientId);

    user.sendProficientRequests.push(proficientId);
    provider.receiveProficientRequest.push(userId);

    const booking = new Booking({
      userId: userId,
      providerId: proficientId,
      dateRequested: requestDateTime,
      city: city,
      location: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
      status: "Pending",
    });

    provider.profile.numberOfRequest += 1;

    await user.save();
    await provider.save();
    await booking.save();
    res.status(200).json({ message: "Booking request sent" });
    console.log("Booking request sent")
  } catch (error) {
    console.log(error);
  }
};

const requestDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await User.findById(id).select("city");

    const booking = await Booking.find({
      userId: id,
    });

    const proficientInfo = await Promise.all(
      booking.map(async (book) => {
        const provider = await User.findById(book.providerId).select(
          "_id profile.firstName profile.lastName profile.profileImage career"
        );
        return {
          provider: provider || null,
          dateRequested: book.dateRequested,
          status: book.status,
          city: book.city,
        };
      })
    );
    res.status(200).json({ proficientInfo });
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const senderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.find({ providerId: id });
    const senderDetails = await Promise.all(
      booking.map(async (book) => {
        const city = book.city;
        const sender = await User.findById(book.userId).select(
          "_id profile email career"
        );
        return {
          sender: sender || null,
          dataRequested: book.dateRequested,
          bookId: book._id,
          status: book.status,
          city: city,
          location: book.location,
        };
      })
    );
    res.status(200).json({ senderDetails });
  } catch (error) {
    console.log(error);
    res.status(401).send("Error", error);
  }
};

const acceptRequest = async (req, res) => {
  const { action, bookId } = req.body;
  try {
    await Booking.findByIdAndUpdate(bookId, { status: action });
    res.status(200).json({ message: "Request Accepted" });
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

module.exports = {
  getProficientData,
  getReviews,
  createBooking,
  requestDetails,
  senderDetails,
  acceptRequest,
};
